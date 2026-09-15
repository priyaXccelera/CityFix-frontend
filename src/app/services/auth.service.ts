import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
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

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly USE_MOCK = true;
  private api = inject(CityfixApiService);

  getUsers(): User[] { return [...mockUsers, ...JSON.parse(localStorage.getItem('app_users') ?? '[]')]; }

  private saveSession(session: AuthSession): void { localStorage.setItem('auth_token', JSON.stringify(session)); }

  // MOCK: local response for the inferred POST /api/v1/auth/login endpoint.
  private localLogin(email: string, password: string): boolean {
    const user = this.getUsers().find((candidate) => candidate.email === email && candidate.password === password && candidate.active);
    if (!user) return false;
    this.saveSession({ id: user.id, name: user.name, email: user.email, role: user.role });
    return true;
  }

  private saveRemoteSession(response: AuthResponse): boolean {
    const user = response.user ?? response;
    const role = String(user['role'] ?? response.role ?? '').toUpperCase();
    if (role !== 'ADMIN' && role !== 'USER') return false;
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

  // TODO(USE_MOCK): verify path + response shape against the real backend's OpenAPI schema before flipping this to false.
  login(email: string, password: string): Observable<boolean> {
    if (this.USE_MOCK) return of(this.localLogin(email, password));
    return this.api.login({ email, password }).pipe(map((response) => this.saveRemoteSession(response)), catchError(() => of(false)));
  }

  // MOCK: local response for inferred POST /api/v1/auth/register endpoint.
  private localSignup(name: string, email: string, password: string, area: string, phone: string): User | null {
    if (this.getUsers().some((user) => user.email === email)) return null;
    const user: User = { id: crypto.randomUUID(), name, email, password, role: 'USER', area, phone, active: true };
    localStorage.setItem('app_users', JSON.stringify([...JSON.parse(localStorage.getItem('app_users') ?? '[]'), user]));
    this.saveSession({ id: user.id, name, email, role: user.role });
    return user;
  }

  // TODO(USE_MOCK): verify path + response shape against the real backend's OpenAPI schema before flipping this to false.
  signup(name: string, email: string, password: string, area: string, phone: string): Observable<User | null> {
    if (this.USE_MOCK) return of(this.localSignup(name, email, password, area, phone));
    return this.api.register({ name, email, password, area, phone }).pipe(
      map((response) => this.saveRemoteSession(response) ? { id: this.currentUser()!.id, name, email, password, role: 'USER' as Role, area, phone, active: true } : null),
      catchError(() => of(null)),
    );
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
