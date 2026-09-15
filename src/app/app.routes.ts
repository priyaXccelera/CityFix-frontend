import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';
import { adminGuard, authGuard } from './guards/auth.guard';
export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent) },
  { path: 'signup', loadComponent: () => import('./pages/signup/signup.component').then((m) => m.SignupComponent) },
  { path: 'forgot-password', loadComponent: () => import('./pages/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent) },
  { path: '', component: ShellComponent, canActivate: [authGuard], children: [
    { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent) },
    { path: 'report-issue', loadComponent: () => import('./pages/report-issue/report-issue.component').then((m) => m.ReportIssueComponent) },
    { path: 'my-issues', loadComponent: () => import('./pages/my-issues/my-issues.component').then((m) => m.MyIssuesComponent) },
    { path: 'browse-issues', loadComponent: () => import('./pages/browse-issues/browse-issues.component').then((m) => m.BrowseIssuesComponent) },
    { path: 'issues/:id', loadComponent: () => import('./pages/issue-detail/issue-detail.component').then((m) => m.IssueDetailComponent) },
    { path: 'announcements', loadComponent: () => import('./pages/announcements/announcements.component').then((m) => m.AnnouncementsComponent) },
    { path: 'announcements/:id', loadComponent: () => import('./pages/announcement-detail/announcement-detail.component').then((m) => m.AnnouncementDetailComponent) },
    { path: 'access-denied', loadComponent: () => import('./pages/access-denied/access-denied.component').then((m) => m.AccessDeniedComponent) },
    { path: 'admin', canActivate: [adminGuard], loadComponent: () => import('./pages/admin-dashboard/admin-dashboard.component').then((m) => m.AdminDashboardComponent) },
    { path: 'manage-issues', canActivate: [adminGuard], loadComponent: () => import('./pages/manage-issues/manage-issues.component').then((m) => m.ManageIssuesComponent) },
    { path: 'departments', canActivate: [adminGuard], loadComponent: () => import('./pages/departments/departments.component').then((m) => m.DepartmentsComponent) },
    { path: 'categories', canActivate: [adminGuard], loadComponent: () => import('./pages/categories/categories.component').then((m) => m.CategoriesComponent) },
    { path: 'manage-announcements', canActivate: [adminGuard], loadComponent: () => import('./pages/manage-announcements/manage-announcements.component').then((m) => m.ManageAnnouncementsComponent) },
    { path: 'users', canActivate: [adminGuard], loadComponent: () => import('./pages/users/users.component').then((m) => m.UsersComponent) },
  ] },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent) },
];
