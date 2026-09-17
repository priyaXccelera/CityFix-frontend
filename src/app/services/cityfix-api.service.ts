import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PageResponse<T> {
  content: T[];
  totalElements?: number;
  totalPages?: number;
  number?: number;
  size?: number;
}

export interface LoginRequest { email: string; password: string; }
export interface RegisterRequest { name: string; email: string; password: string; area?: string; phone?: string; requestedRole: 'USER' | 'ADMIN' | 'SUPER_ADMIN'; }
export interface CreateAdminRequest { name: string; email: string; password: string; }
export interface AuthResponse { token?: string; accessToken?: string; user?: Record<string, unknown>; id?: string; name?: string; email?: string; role?: string; }

@Injectable({ providedIn: 'root' })
export class CityfixApiService {
  private http = inject(HttpClient);

  // Inferred from the backend; verify this request and response against the real API.
  login(body: LoginRequest): Observable<AuthResponse> { return this.http.post<AuthResponse>('/api/v1/auth/login', body); }
  // Inferred from the backend; verify this request and response against the real API.
  register(body: RegisterRequest): Observable<AuthResponse> { return this.http.post<AuthResponse>('/api/v1/auth/register', body); }
  // Inferred from the backend; verify this request and response against the real API.
  createAdmin(body: CreateAdminRequest): Observable<Record<string, unknown>> { return this.http.post<Record<string, unknown>>('/api/v1/users/admin', body); }

  // Inferred from the backend; verify this request and response against the real API.
  upvoteIssue(issueId: string): Observable<Record<string, unknown>> { return this.http.post<Record<string, unknown>>(`/api/v1/issues/${issueId}/upvotes`, {}); }
  // Inferred from the backend; verify this request and response against the real API.
  addIssueComment(issueId: string, body: Record<string, unknown>): Observable<Record<string, unknown>> { return this.http.post<Record<string, unknown>>(`/api/v1/issues/${issueId}/comments`, body); }
  // Inferred from the backend; verify this request and response against the real API.
  getIssueComments(issueId: string): Observable<PageResponse<Record<string, unknown>>> { return this.http.get<PageResponse<Record<string, unknown>>>(`/api/v1/issues/${issueId}/comments`); }

  // Inferred from the backend; verify this request and response against the real API.
  createDepartment(body: Record<string, unknown>): Observable<Record<string, unknown>> { return this.http.post<Record<string, unknown>>('/api/v1/departments', body); }
  // Inferred from the backend; verify this request and response against the real API.
  updateDepartment(id: string, body: Record<string, unknown>): Observable<Record<string, unknown>> { return this.http.put<Record<string, unknown>>(`/api/v1/departments/${id}`, body); }
  // Inferred from the backend; verify this request and response against the real API.
  deleteDepartment(id: string): Observable<void> { return this.http.delete<void>(`/api/v1/departments/${id}`); }
  // Inferred from the backend; verify this request and response against the real API.
  getDepartment(id: string): Observable<Record<string, unknown>> { return this.http.get<Record<string, unknown>>(`/api/v1/departments/${id}`); }
  // Inferred from the backend; verify this request and response against the real API.
  getDepartments(): Observable<PageResponse<Record<string, unknown>>> { return this.http.get<PageResponse<Record<string, unknown>>>('/api/v1/departments'); }

  // Inferred from the backend; verify this request and response against the real API.
  getIssueAnalytics(): Observable<Record<string, unknown>> { return this.http.get<Record<string, unknown>>('/api/v1/issues/analytics'); }
  // Inferred from the backend; verify this request and response against the real API.
  createIssue(body: Record<string, unknown>): Observable<Record<string, unknown>> { return this.http.post<Record<string, unknown>>('/api/v1/issues', body); }
  // Inferred from the backend; verify this request and response against the real API.
  getIssues(): Observable<PageResponse<Record<string, unknown>>> { return this.http.get<PageResponse<Record<string, unknown>>>('/api/v1/issues'); }
  // Inferred from the backend; verify this request and response against the real API.
  getMyIssues(): Observable<PageResponse<Record<string, unknown>>> { return this.http.get<PageResponse<Record<string, unknown>>>('/api/v1/issues/my'); }
  // Inferred from the backend; verify this request and response against the real API.
  getIssue(id: string): Observable<Record<string, unknown>> { return this.http.get<Record<string, unknown>>(`/api/v1/issues/${id}`); }
  // Inferred from the backend; verify this request and response against the real API.
  assignIssueDepartment(id: string, body: Record<string, unknown>): Observable<Record<string, unknown>> { return this.http.put<Record<string, unknown>>(`/api/v1/issues/${id}/assign`, body); }
  // Inferred from the backend; verify this request and response against the real API.
  updateIssueStatus(id: string, body: Record<string, unknown>): Observable<Record<string, unknown>> { return this.http.put<Record<string, unknown>>(`/api/v1/issues/${id}/status`, body); }
  // Inferred from the backend; verify this request and response against the real API.
  updateIssuePriority(id: string, body: Record<string, unknown>): Observable<Record<string, unknown>> { return this.http.put<Record<string, unknown>>(`/api/v1/issues/${id}/priority`, body); }

  // Inferred from the backend; verify this request and response against the real API.
  createCategory(body: Record<string, unknown>): Observable<Record<string, unknown>> { return this.http.post<Record<string, unknown>>('/api/v1/categories', body); }
  // Inferred from the backend; verify this request and response against the real API.
  updateCategory(id: string, body: Record<string, unknown>): Observable<Record<string, unknown>> { return this.http.put<Record<string, unknown>>(`/api/v1/categories/${id}`, body); }
  // Inferred from the backend; verify this request and response against the real API.
  deleteCategory(id: string): Observable<void> { return this.http.delete<void>(`/api/v1/categories/${id}`); }
  // Inferred from the backend; verify this request and response against the real API.
  getCategory(id: string): Observable<Record<string, unknown>> { return this.http.get<Record<string, unknown>>(`/api/v1/categories/${id}`); }
  // Inferred from the backend; verify this request and response against the real API.
  getCategories(): Observable<PageResponse<Record<string, unknown>>> { return this.http.get<PageResponse<Record<string, unknown>>>('/api/v1/categories'); }

  // Inferred from the backend; verify this request and response against the real API.
  getUsers(): Observable<PageResponse<Record<string, unknown>>> { return this.http.get<PageResponse<Record<string, unknown>>>('/api/v1/users'); }
  // Inferred from the backend; verify this request and response against the real API.
  getPendingAdminRequests(): Observable<PageResponse<Record<string, unknown>>> { return this.http.get<PageResponse<Record<string, unknown>>>('/api/v1/users', { params: { role: 'ADMIN', status: 'PENDING' } }); }
  // Inferred from the backend; verify this request and response against the real API.
  approveAdminRequest(id: string): Observable<Record<string, unknown>> { return this.http.put<Record<string, unknown>>(`/api/v1/users/${id}/approve`, {}); }
  // Inferred from the backend; verify this request and response against the real API.
  rejectAdminRequest(id: string): Observable<Record<string, unknown>> { return this.http.put<Record<string, unknown>>(`/api/v1/users/${id}/reject`, {}); }
  // Inferred from the backend; verify this request and response against the real API.
  getUser(id: string): Observable<Record<string, unknown>> { return this.http.get<Record<string, unknown>>(`/api/v1/users/${id}`); }
  // Inferred from the backend; verify this request and response against the real API.
  deactivateUser(id: string): Observable<Record<string, unknown>> { return this.http.put<Record<string, unknown>>(`/api/v1/users/${id}/deactivate`, {}); }
  // Inferred from the backend; verify this request and response against the real API.
  getAnalytics(): Observable<Record<string, unknown>> { return this.http.get<Record<string, unknown>>('/api/v1/analytics'); }

  // Inferred from the backend; verify this request and response against the real API.
  createAnnouncement(body: Record<string, unknown>): Observable<Record<string, unknown>> { return this.http.post<Record<string, unknown>>('/api/v1/announcements', body); }
  // Inferred from the backend; verify this request and response against the real API.
  updateAnnouncement(id: string, body: Record<string, unknown>): Observable<Record<string, unknown>> { return this.http.put<Record<string, unknown>>(`/api/v1/announcements/${id}`, body); }
  // Inferred from the backend; verify this request and response against the real API.
  deleteAnnouncement(id: string): Observable<void> { return this.http.delete<void>(`/api/v1/announcements/${id}`); }
  // Inferred from the backend; verify this request and response against the real API.
  getAnnouncement(id: string): Observable<Record<string, unknown>> { return this.http.get<Record<string, unknown>>(`/api/v1/announcements/${id}`); }
  // Inferred from the backend; verify this request and response against the real API.
  getAnnouncements(): Observable<PageResponse<Record<string, unknown>>> { return this.http.get<PageResponse<Record<string, unknown>>>('/api/v1/announcements'); }
}
