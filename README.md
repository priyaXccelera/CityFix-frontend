# CityFix-frontend

CityFix is a civic issue reporting portal for residents to submit, follow, discuss, and support neighborhood problems. It also includes authenticated, role-aware administration routes for city staff.

## Tech stack
Angular (standalone components) + TypeScript, Tailwind CSS.

## Getting started
```
npm install --legacy-peer-deps
npm start
```
Then open http://localhost:51245

## Environment variables
Angular does not read .env files directly — see .env.example, which documents the value; copy it into src/environments/environment.ts's apiUrl field. Every entity runs on local mock data (readonly USE_MOCK = true in each <entity>-store.service.ts) until that's set and each entity's flag is flipped to false.

## Project structure
- `components/` — shared sidebar and top-bar navigation.
- `data/` — typed mock seed records.
- `guards/` — authentication and administrator route guards.
- `layout/` — application shell.
- `pages/` — lazy-loaded application screens.
- `services/` — mock/API-gated auth, issue, and civic data services.
- `types/` — domain interfaces and string union types.
