import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { mockUsers } from '../data/mock-data';
import { Role, User } from '../types';
import { AuthResponse, CityfixApiService } from './cityfix-api.service';

interface AuthSession {
  id: string;
  name: string;
  email: string;
  role: Role;
  accessToken?: string;
}

export type LoginResult = { success: true } | { success: false; reason: 'INVALID' | 'PENDING' | 'REJECTED' };
export type SignupResult = { success: true; autoLoggedIn: boolean } | { success: false; reason: 'DUPLICATE_EMAIL' | 'SUPER_ADMIN_EXISTS' | 'UNKNOWN' };

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly USE_MOCK = true;
  private api = inject(CityfixApiService);

  getUsers(): User[] {
    const civicUsers: User[] = JSON.parse(localStorage.getItem('cityfix_users') ?? 'null') ?? mockUsers;
    const legacyUsers: User[] = JSON.parse(localStorage.getItem('app_users') ?? '[]');
    return [...civicUsers, ...legacyUsers.filter((legacyUser) => !civicUsers.some((user) => user.id === legacyUser.id))];
  }

  private saveSession(session: AuthSession): void { localStorage.setItem('auth_token', JSON.stringify(session)); }

  // MOCK: local response for the inferred POST /api/v1/auth/login endpoint.
  private localLogin(email: string, password: string): LoginResult {
    const user = this.getUsers().find((candidate) => candidate.email === email && candidate.password === password);
    if (!user || !user.active) return { success: false, reason: 'INVALID' };
    if (user.status === 'PENDING') return { success: false, reason: 'PENDING' };
    if (user.status === 'REJECTED') return { success: false, reason: 'REJECTED' };
    this.saveSession({ id: user.id, name: user.name, email: user.email, role: user.role });
    return { success: true };
  }

  private saveRemoteSession(response: AuthResponse): boolean {
    const user = response.user ?? response;
    const role = String(user['role'] ?? response.role ?? '').toUpperCase();
    if (role !== 'SUPER_ADMIN' && role !== 'ADMIN' && role !== 'USER') return false;
    const email = String(user['email'] ?? response.email ?? '');
    this.saveSession({
      id: String(user['id'] ?? response.id ?? email),
      name: String(user['name'] ?? response.name ?? email),
      email,
      role,
      accessToken: response.accessToken ?? response.token,
    });
    return true;
  }

  private loginFailure(error: unknown): LoginResult {
    const body = error instanceof HttpErrorResponse ? error.error : null;
    const code = String(body?.code ?? body?.status ?? body?.message ?? '').toUpperCase();
    if (code.includes('PENDING')) return { success: false, reason: 'PENDING' };
    if (code.includes('REJECTED')) return { success: false, reason: 'REJECTED' };
    return { success: false, reason: 'INVALID' };
  }

  // TODO(USE_MOCK): verify path + response shape against the real backend's OpenAPI schema before flipping this to false.
  login(email: string, password: string): Observable<LoginResult> {
    if (this.USE_MOCK) return of(this.localLogin(email, password));
    return this.api.login({ email, password }).pipe(
      map((response) => this.saveRemoteSession(response) ? { success: true } as LoginResult : { success: false, reason: 'INVALID' } as LoginResult),
      catchError((error) => of(this.loginFailure(error))),
    );
  }

  // MOCK: local response for inferred POST /api/v1/auth/register endpoint.
  private localSignup(name: string, email: string, password: string, area: string, phone: string, requestedRole: Role): SignupResult {
    if (this.getUsers().some((user) => user.email.toLowerCase() === email.toLowerCase())) return { success: false, reason: 'DUPLICATE_EMAIL' };
    if (requestedRole === 'SUPER_ADMIN' && this.getUsers().some((user) => user.role === 'SUPER_ADMIN')) return { success: false, reason: 'SUPER_ADMIN_EXISTS' };
    const status = requestedRole === 'ADMIN' ? 'PENDING' : 'APPROVED';
    const user: User = { id: crypto.randomUUID(), name, email, password, role: requestedRole, area, phone, active: true, status, createdAt: new Date().toISOString() };
    localStorage.setItem('cityfix_users', JSON.stringify([...this.getUsers(), user]));
    if (requestedRole !== 'ADMIN') this.saveSession({ id: user.id, name, email, role: user.role });
    return { success: true, autoLoggedIn: requestedRole !== 'ADMIN' };
  }

  private signupFailure(error: unknown, requestedRole: Role): SignupResult {
    if (error instanceof HttpErrorResponse && error.status === 409) return { success: false, reason: requestedRole === 'SUPER_ADMIN' ? 'SUPER_ADMIN_EXISTS' : 'DUPLICATE_EMAIL' };
    return { success: false, reason: 'UNKNOWN' };
  }

  // TODO(USE_MOCK): verify path + response shape against the real backend's OpenAPI schema before flipping this to false.
  signup(name: string, email: string, password: string, area: string, phone: string, requestedRole: Role): Observable<SignupResult> {
    if (this.USE_MOCK) return of(this.localSignup(name, email, password, area, phone, requestedRole));
    return this.api.register({ name, email, password, area, phone, requestedRole }).pipe(
      map((response) => ({ success: true, autoLoggedIn: requestedRole !== 'ADMIN' && this.saveRemoteSession(response) }) as SignupResult),
      catchError((error) => of(this.signupFailure(error, requestedRole))),
    );
  }

  // MOCK: local result for the inferred admin-only Create Admin API.
  private localCreateAdmin(name: string, email: string, password: string): string | null {
    if (this.currentRole() !== 'SUPER_ADMIN') return 'You do not have permission to create administrator accounts.';
    if (this.getUsers().some((user) => user.email.toLowerCase() === email.toLowerCase())) return 'An account with this email already exists.';
    const user: User = { id: crypto.randomUUID(), name, email, password, role: 'ADMIN', area: '', phone: '', active: true };
    localStorage.setItem('cityfix_users', JSON.stringify([...this.getUsers(), user]));
    return null;
  }

  // TODO(USE_MOCK): verify path + response shape against the real backend's OpenAPI schema before flipping this to false.
  createAdmin(name: string, email: string, password: string): Observable<void> {
    if (this.USE_MOCK) {
      const error = this.localCreateAdmin(name, email, password);
      return error ? throwError(() => new Error(error)) : of(void 0);
    }
    return this.api.createAdmin({ name, email, password }).pipe(map(() => void 0));
  }

  // MOCK: local result for inferred pending-admin approval endpoints.
  getPendingAdminRequests(): Observable<User[]> {
    if (this.USE_MOCK) return of(this.getUsers().filter((user) => user.role === 'ADMIN' && user.status === 'PENDING'));
    return this.api.getPendingAdminRequests().pipe(map((response) => response.content.map((user) => this.apiUserToUser(user))));
  }

  // MOCK: local result for inferred PUT /api/v1/users/{id}/approve endpoint.
  approveAdminRequest(id: string): Observable<void> {
    if (this.USE_MOCK) return of(this.updateLocalAdminRequest(id, 'APPROVED'));
    return this.api.approveAdminRequest(id).pipe(map(() => void 0));
  }

  // MOCK: local result for inferred PUT /api/v1/users/{id}/reject endpoint.
  rejectAdminRequest(id: string): Observable<void> {
    if (this.USE_MOCK) return of(this.updateLocalAdminRequest(id, 'REJECTED'));
    return this.api.rejectAdminRequest(id).pipe(map(() => void 0));
  }

  // MOCK: updates the locally stored pending administrator after Super Admin review.
  private updateLocalAdminRequest(id: string, status: 'APPROVED' | 'REJECTED'): void {
    const users = this.getUsers();
    const user = users.find((candidate) => candidate.id === id && candidate.role === 'ADMIN' && candidate.status === 'PENDING');
    if (user) user.status = status;
    localStorage.setItem('cityfix_users', JSON.stringify(users));
  }

  private apiUserToUser(user: Record<string, unknown>): User {
    return { id: String(user['id']), name: String(user['name'] ?? ''), email: String(user['email'] ?? ''), password: '', role: String(user['role'] ?? 'USER').toUpperCase() as Role, area: String(user['area'] ?? ''), phone: String(user['phone'] ?? ''), active: user['active'] !== false, status: String(user['status'] ?? 'PENDING').toUpperCase() as User['status'], createdAt: String(user['createdAt'] ?? user['registrationDate'] ?? '') };
  }

  logout(): void { localStorage.removeItem('auth_token'); }
  isAuthenticated(): boolean { return Boolean(this.currentUser()); }
  currentUser(): AuthSession | null {
    const raw = localStorage.getItem('auth_token');
    if (!raw) return null;
    try { return JSON.parse(raw) as AuthSession; } catch { this.logout(); return null; }
  }
  currentRole(): Role | null { return this.currentUser()?.role ?? null; }
  accessToken(): string | null { return this.currentUser()?.accessToken ?? null; }
}
