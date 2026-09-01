# AbroadHub — Web Companion · Phase 0 Findings

_Date: Feb 2026 · Repo: /app_

## Confirmed inputs
- **Brand name**: AbroadHub · Tagline: "Connecting people abroad."
- **Primary color**: Coral `#F46F5E`
- **Logo direction**: plane-in-triangle mark + script wordmark (rendered inline as SVG in `components/Brand.jsx` — replace with the official asset once provided).
- **Bottom nav (5 tabs)**: Home · Explore · Jobs · Nearby · Profile
- **Scope**: Full Phase 1 (Home feed, Explore grid, Jobs, Nearby, Profile, Auth UI, responsive, loading/empty/error states).
- **API strategy**: Mock adapter behind a service boundary. Real adapter stubbed and ready to be wired later. Toggle via `REACT_APP_USE_MOCKS`.
- **Auth**: Open — using a **DEV-mode mock login** clearly labelled in-UI. **NOT** production auth.

## Open Items (require inputs to unblock)
1. **Live API base URL** + Postman/Swagger, or backend repo access.
2. **Flutter source or additional screenshots** for: Login/Signup, Post detail, Create-post/job/service, Messaging, Notifications, Housing (if exists), Events (if exists), empty/error states, filter modals.
3. **Auth mechanism**: JWT header vs cookie? Refresh tokens? Social providers?
4. **Media/storage provider** used by mobile (S3? Cloudinary? Firebase?).
5. **Real-time messaging** transport (WS/Socket.IO vs polling).
6. **Location**: manual city fallback + geocoding provider used by mobile.
7. **Deployment target** (Vercel likely) + backend domain for CORS.

## Architecture
```
React UI (features/*, components/*)
        │
        ▼
  services/api/index.js   ← chooses adapter based on REACT_APP_USE_MOCKS
        │
   ┌────┴─────┐
mockAdapter   realAdapter (stub) ─→ httpClient (axios) ─→ REAL AbroadHub API (TBD)
```
- Mock data is never imported by UI. It lives only inside `services/api/mockData.js`.
- Auth token stored in `localStorage` (`ah_token`) via httpClient interceptor. This will need to be replaced/aligned with the mobile app's actual mechanism.

## Design tokens (inferred from confirmed brand)
- Coral primary `#F46F5E`, coral-600 `#E85E4C`, coral-50 `#FEF1EE`
- Ink `#14171A`, ink-2 `#4A5058`, ink-3 `#8A929B`
- Surface `#FFFFFF`, background `#F7F8FA`, line `#ECEEF1`
- Radius: 8 / 12 / 14 / 20 / pill
- Font: **Plus Jakarta Sans** (marked as inferred — will swap to the confirmed mobile font once shared).

## Screens implemented (Phase 1)
| Screen | Status | Reference source |
|---|---|---|
| Login | Implemented (DEV auth) | Inferred — awaiting screenshot |
| Signup | Implemented (DEV auth) | Inferred — awaiting screenshot |
| Home (stories + feed) | Implemented | Confirmed layout, styling inferred |
| Explore (masonry) | Implemented | Confirmed layout, styling inferred |
| Jobs (location + search + chips + list) | Implemented | Confirmed layout, styling inferred |
| Nearby (categories + popular services) | Implemented | Confirmed layout, styling inferred |
| Profile (header + posts/photos tabs) | Implemented | Confirmed layout, styling inferred |
| Empty / Error / Loading states | Implemented | Inferred |

## What will change once real inputs arrive
- Fonts, exact spacing, exact radii and shadow depths (currently ~inferred).
- Auth flow: signup fields, validation rules, OAuth providers, error copy.
- API contracts (request/response shapes) inside `realAdapter.js` will be finalized.
- Real logo asset will replace the inline SVG in `components/Brand.jsx`.
- Nearby endpoint is not confirmed to exist in the mobile app — flagged in `realAdapter.js`.

## Environment
- `REACT_APP_USE_MOCKS=true` — flip to `false` once the real API URL is set in `REACT_APP_API_BASE_URL`.
- `REACT_APP_API_BASE_URL` — leave blank until confirmed; UI still works on mocks.
- `REACT_APP_BACKEND_URL` — Emergent template backend URL (used only as fallback path root).
