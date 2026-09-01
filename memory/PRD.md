# AbroadHub Web Companion — PRD

## Problem Statement (verbatim)
Production-grade React web version of the existing AbroadHub Flutter mobile app. UI faithful to mobile; backend is the existing Node/Express/MongoDB (to be integrated later). Brand: AbroadHub, tagline "Connecting people abroad.", primary Coral #F46F5E, 5-tab bottom nav (Home, Explore, Jobs, Nearby, Profile).

## Architecture
```
React UI (features/*, components/*)
        │
        ▼
services/api/index.js  ← REACT_APP_USE_MOCKS switch
        │
   ┌────┴─────┐
mockAdapter   realAdapter (stub) → httpClient (axios) → REAL AbroadHub API (TBD)
```
- Mock data isolated to `services/api/mockData.js`. Never imported by UI.
- Auth via React Context + localStorage token; interceptor sends Bearer.
- Router with `RequireAuth` guard.
- Design tokens in `src/design-system/tokens.js`.

## User Personas
1. **Person abroad** (expat/nomad) — reads feed, browses local services, discovers jobs.
2. **New arrival** — signs up, joins the community, finds local pros.
3. **Business/service** — posts jobs, promotes services (Phase 2).

## Implemented (Feb 2026, Phase 1)
- Auth UI (Login + Signup) with DEV/mock adapter clearly labelled
- Home (stories row + feed + like toggle)
- Explore (masonry grid + client-side search)
- Jobs (location bar + search + filter chips + save toggle)
- Nearby (categories grid + popular services)
- Profile (avatar, stats, bio, Edit/Share/Settings, Posts/Photos tabs, logout)
- Bottom nav (5 tabs, coral active), sticky TopBar, DEV banner
- Loading skeletons, EmptyState, ErrorState with retry
- Adapter pattern with mockAdapter + realAdapter (stubbed with placeholder paths)
- Mobile-first responsive; max-w-2xl centered container on desktop

## Open Items (require real inputs)
1. Live API base URL + Postman/Swagger, or backend repo
2. Additional Flutter screenshots (Login, Post detail, Create flows, Messaging, Notifications)
3. Auth mechanism (JWT vs cookie, refresh tokens, social providers)
4. Media/storage provider
5. Realtime transport (WS vs polling) for Messaging
6. Manual city fallback + geocoding provider
7. Deployment target + backend domain for CORS
8. Official logo asset (currently inline SVG)

## Phase 2 Backlog (P1)
- Post detail page + create/edit/delete post + comments
- Job detail + Apply / Message / Call / Share
- Service/marketplace detail + contact
- Messaging (transport TBD)
- Notifications center
- Search (category-aware, matching mobile behavior)
- Housing & Events (only if confirmed in mobile app)

## Phase 3 (P2) — QA & Hardening
- All 28 critical flows against real backend
- Visual diff pass vs Flutter screenshots
- SEO on public pages, security pass, CORS
