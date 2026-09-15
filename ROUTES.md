# CityFix-frontend — Routes & Navigation

## How to run
cd /home/ryzen/frontend_generator_backend-test/frontend_runs/run_32acf221_20260915_120127/project
npm install --legacy-peer-deps && npx ng serve --port 51245
Then open http://localhost:51245

## Routes

| Route | Component file | Description |
|-------|----------------|-------------|
| / | redirects | Redirects to the main screen |
| /login | src/app/pages/login/login.component.ts | Public sign-in screen |
| /signup | src/app/pages/signup/signup.component.ts | Public resident registration screen |
| /forgot-password | src/app/pages/forgot-password/forgot-password.component.ts | Password recovery guidance |
| /dashboard | src/app/pages/dashboard/dashboard.component.ts | Resident dashboard |
| /report-issue | src/app/pages/report-issue/report-issue.component.ts | Create a civic issue report |
| /my-issues | src/app/pages/my-issues/my-issues.component.ts | Current user's issue reports |
| /browse-issues | src/app/pages/browse-issues/browse-issues.component.ts | Community issue browser |
| /issues/:id | src/app/pages/issue-detail/issue-detail.component.ts | Issue detail and comments |
| /announcements | src/app/pages/announcements/announcements.component.ts | City announcements |
| /announcements/:id | src/app/pages/announcement-detail/announcement-detail.component.ts | Announcement detail |
| /admin | src/app/pages/admin-dashboard/admin-dashboard.component.ts | Admin dashboard |
| /manage-issues | src/app/pages/manage-issues/manage-issues.component.ts | Admin issue workspace |
| /departments | src/app/pages/departments/departments.component.ts | Department administration |
| /categories | src/app/pages/categories/categories.component.ts | Category administration |
| /manage-announcements | src/app/pages/manage-announcements/manage-announcements.component.ts | Announcement administration |
| /users | src/app/pages/users/users.component.ts | Resident administration |
| /access-denied | src/app/pages/access-denied/access-denied.component.ts | Authorization failure screen |
| /** | src/app/pages/not-found/not-found.component.ts | Unknown-route fallback |

## Navigation map
- Login -> Admin Dashboard or Dashboard (successful role-aware sign in)
- Signup -> Dashboard (successful registration)
- Dashboard -> Report Issue, My Reports, Browse Issues, and Announcements (cards and links)
- Report Issue -> Issue Detail (valid form submission)
- My Reports -> Issue Detail (report selection)
- Browse Issues -> Issue Detail (issue selection)
- Issue Detail -> previous screen (Back button)
- Announcements -> Announcement Detail (announcement selection)
- Sidebar -> every authenticated workspace for the current role
- Any authenticated screen -> Login (sign out)
- Any admin-only route -> Access Denied (non-admin role)
- Any page -> NotFound (unknown URL)

## Shared components
- `src/app/components/sidebar/sidebar.component.ts` — role-aware main navigation and sign-out action.
- `src/app/components/topbar/topbar.component.ts` — authenticated-user identity header.

## Design tokens
- `primary`: #1d4ed8
- `surface`: #ffffff
- `canvas`: #f4f7fb
- `ink`: #172033
- `muted`: #64748b
- `accent`: #dbeafe
- `success`: #15803d
- `warning`: #b45309
- `danger`: #dc2626

