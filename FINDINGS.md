# AbroadHub Web — Findings Report

_Updated: Feb 2026 · Primary visual source of truth: **Abroad Hub.pdf** (attached by user)_

## Screens implemented (matched to PDF pages)
| PDF ref | Screen | Route | Status |
|---|---|---|---|
| p.2, p.28 | Home (Abroad Hub feed + Add Story + post ⋯ menu) | `/` | ✅ |
| p.3, p.4 | Create sheet (New Post / Story / Housing / Event / Job) | Sheet | ✅ |
| p.5 | Notifications (Mark all read, per-row read state) | `/notifications` | ✅ |
| p.6 | Inbox (list) | `/inbox` | ✅ |
| p.6 | Chat (send/receive dev messages) | `/inbox/:cid` | ✅ |
| p.7 | Share sheet (Copy link / Share to / Send in message) | Sheet | ✅ |
| p.8 | Explore (masonry, search opens Search) | `/explore` | ✅ |
| p.9 | Jobs (Bookmark + `+`, Location, Search, Recently Posted, Call/Message/Share) | `/jobs` | ✅ |
| p.10 | Nearby (12 categories with named icons + Housing section) | `/nearby` | ✅ |
| p.11–17 | All Categories (Business + Service Providers, search filter) | `/nearby/categories` | ✅ |
| p.18–20 | Event Listing form (all fields + photos + Post Event) | `/events/new` | ✅ |
| p.21–22 | Post a Job form (all fields + Post button in header) | `/jobs/new` | ✅ |
| p.23–24 | Profile (username header, avatar, Followers/Following, Edit/Share, Posts/Photos tabs) | `/profile` | ✅ |
| p.25 | Edit Profile (all fields, locked email/country, avatar edit) | `/profile/edit` | ✅ |
| p.26–27 | Settings (Account + App Settings + Support, Private toggle, Logout, Delete confirm) | `/settings` | ✅ |
| p.29–31 | Search (Posts / Accounts / Provider tabs, Follow buttons) | `/search` | ✅ |
| — | Login / Signup (dev-mode) | `/login`, `/signup` | ✅ |

## Interactions implemented
- Auth (real JWT via FastAPI backend, matches /api/auth/*)
- Home: like/comment/share, post ⋯ menu (Add to your story / Edit Post / Delete for own posts), View more expander, story tile → open Create menu
- Create menu: 5 options; New Post → composer; Event/Job → routed forms
- Notifications: mark individual, mark all read
- Inbox: open conversations, real message send/receive in local dev state
- Share menu: Copy link, Share to (Web Share API), Send in message
- Jobs: search, location prompt, Recently Posted list, save/bookmark toggle, Call (tel:), Message (toast), Share (Web Share/clipboard), Post a Job route
- Post a Job: full form with dropdowns, logo picker, phone country code, description; submits to mock API and returns
- Nearby: category tap (More → All Categories, others → provider toast), location + search, See All
- All Categories: search filter across Business and Service Providers
- Profile: switch Posts/Photos, Edit Profile route, Share Profile via Web Share, top-bar Create/Saved/Settings
- Edit Profile: save all fields (name, username, phone, bio, website, gender, occupation, languages, avatar), locked email/country
- Settings: Private Account toggle, Delete Account confirmation, Log out (real), Help/Privacy/Rate toast stubs
- Search: 3 tabs, live filter across posts/accounts/providers, Follow toggle per provider
- Event form: text/dropdown/toggle/datetime/photo/languages, validation
- Responsive: mobile-first layout with fixed bottom nav; desktop (`lg+`) hides bottom nav and shows a compact sidebar with the same navigation, secondary shortcuts, Create button and user card

## Mock services (isolated, replaceable)
File: `/app/frontend/src/services/api/mockAdapter.js` — exposes:
- `login / signup / me`
- `getStories / getFeed / toggleLike / createPost / deletePost / updatePost`
- `getExplore`
- `getJobs / createJob / toggleSaveJob`
- `getNearbyCategories / getBusinessCategories / getServiceProviders`
- `getNotifications / markNotificationRead / markAllNotificationsRead`
- `getConversations / getMessages / sendMessage`
- `searchPosts / searchAccounts / searchProviders / toggleFollowProvider`
- `getProfile / updateProfile`

Real adapter (`realAdapter.js`) already stubs matching HTTP paths and can be enabled by
setting `REACT_APP_USE_MOCKS=false` and pointing `REACT_APP_API_BASE_URL` at the real
AbroadHub API.

## Known limitations / not reproduced exactly
- **Logo**: rendered inline as SVG in `components/Brand.jsx`. Once the official
  AbroadHub asset is provided, drop it into `/app/frontend/public/logo.svg` and swap
  the `BrandMarkColor` / `BrandMarkWhite` bodies for `<img src="/logo.svg" />`.
- **Category icons**: the mobile app uses custom illustrated icons; we render lucide
  glyphs on the reference-matching pastel backgrounds as the closest generic match.
  Swap for the official icon set when available.
- **Post detail page** (PDF p.7 background content behind the share sheet): the
  Wellstar Data Analyst deep-view page is not yet built; share sheet + basic post view
  in the feed are implemented.
- **Story viewer / capture**: composer only; camera capture is out of scope for web MVP.
- **Real-time messaging** transport: local dev-only. Swap `sendMessage` for a WS or
  polling client once confirmed.
- **Notifications persistence**: local session state only. Server sync stubbed.
- **Photo picker**: uses URL prompt for the dev environment; drop-in file upload will
  hook into the confirmed storage provider once known.

## Open Items (require real backend/API)
1. Live API base URL + Postman/Swagger, or backend repo access.
2. Auth mechanism confirmation (JWT vs cookie, refresh tokens).
3. Media/storage provider used by the mobile app.
4. Real-time messaging transport (WebSocket / Socket.IO / polling).
5. Geocoding provider used for location fields.
6. Official logo asset + custom category icon set.
7. Production domain for CORS.

## Environment
- `REACT_APP_USE_MOCKS=true` — flip to `false` when real API is available.
- `REACT_APP_API_BASE_URL` — set once the real base URL is known.
- `REACT_APP_BACKEND_URL` — Emergent template backend (currently powers `/api/auth/*`).
