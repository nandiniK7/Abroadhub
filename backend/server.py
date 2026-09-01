from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import uuid
import logging
from datetime import datetime, timezone, timedelta

import bcrypt
import jwt
from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, ConfigDict

# ---------- MongoDB ----------
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# ---------- App ----------
app = FastAPI(title="AbroadHub API (dev)")
api_router = APIRouter(prefix="/api")

# ---------- Config ----------
JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALGORITHM = "HS256"
JWT_EXP_HOURS = int(os.environ.get('JWT_EXP_HOURS', '168'))

logger = logging.getLogger("abroadhub")
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# ---------- Password helpers ----------
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode('utf-8'), hashed.encode('utf-8'))
    except Exception:
        return False

# ---------- JWT helpers ----------
def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXP_HOURS),
        "iat": datetime.now(timezone.utc),
        "type": "access",
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def decode_token(token: str) -> dict:
    return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])

# ---------- Models ----------
class RegisterRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=80)
    email: EmailStr
    password: str = Field(..., min_length=4, max_length=128)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class PublicUser(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str
    email: EmailStr
    handle: str
    avatar: str
    city: str | None = None
    bio: str | None = None
    followers: int = 0
    following: int = 0
    postsCount: int = 0

class AuthResponse(BaseModel):
    token: str
    user: PublicUser

def user_doc_to_public(doc: dict) -> PublicUser:
    return PublicUser(
        id=doc["_id"],
        name=doc["name"],
        email=doc["email"],
        handle=doc.get("handle") or ("@" + doc["name"].split()[0].lower()),
        avatar=doc.get("avatar") or f"https://api.dicebear.com/9.x/avataaars/svg?seed={doc['_id']}",
        city=doc.get("city"),
        bio=doc.get("bio"),
        followers=doc.get("followers", 0),
        following=doc.get("following", 0),
        postsCount=doc.get("postsCount", 0),
    )

# ---------- Auth dependency ----------
bearer_scheme = HTTPBearer(auto_error=False)

async def get_current_user(
    creds: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
) -> dict:
    if not creds or creds.scheme.lower() != "bearer" or not creds.credentials:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    try:
        payload = decode_token(creds.credentials)
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = await db.users.find_one({"_id": payload["sub"]})
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    user.pop("password_hash", None)
    return user

# ---------- Root ----------
@api_router.get("/")
async def root():
    return {"message": "AbroadHub API up"}

# ---------- Auth endpoints ----------
@api_router.post("/auth/register", response_model=AuthResponse, status_code=201)
async def register(body: RegisterRequest):
    email = body.email.lower().strip()
    existing = await db.users.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=409, detail="An account with this email already exists.")

    user_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()
    doc = {
        "_id": user_id,
        "name": body.name.strip(),
        "email": email,
        "handle": "@" + body.name.strip().split()[0].lower(),
        "avatar": f"https://api.dicebear.com/9.x/avataaars/svg?seed={user_id}",
        "city": None,
        "bio": None,
        "followers": 0,
        "following": 0,
        "postsCount": 0,
        "password_hash": hash_password(body.password),
        "created_at": now,
    }
    await db.users.insert_one(doc)
    token = create_access_token(user_id, email)
    return AuthResponse(token=token, user=user_doc_to_public(doc))

@api_router.post("/auth/login", response_model=AuthResponse)
async def login(body: LoginRequest):
    email = body.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(body.password, user.get("password_hash", "")):
        raise HTTPException(status_code=401, detail="Invalid email or password.")
    token = create_access_token(user["_id"], user["email"])
    return AuthResponse(token=token, user=user_doc_to_public(user))

@api_router.get("/auth/me", response_model=PublicUser)
async def me(user: dict = Depends(get_current_user)):
    return user_doc_to_public(user)

@api_router.post("/auth/logout")
async def logout(_: dict = Depends(get_current_user)):
    # Bearer flow — client discards the token; nothing to do server-side.
    return {"ok": True}

# ---------- Include router + middleware ----------
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Startup / Shutdown ----------
@app.on_event("startup")
async def on_startup():
    try:
        await db.users.create_index("email", unique=True)
        logger.info("AbroadHub: users.email unique index ensured")
    except Exception as e:
        logger.warning(f"Index creation warning: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
