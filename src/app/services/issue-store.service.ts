import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mockIssues } from '../data/mock-data';
import { Comment, Issue, IssueStatus, Priority } from '../types';

@Injectable({ providedIn: 'root' })
export class IssueStoreService {
  readonly USE_MOCK = true;
  private http = inject(HttpClient);
  private load(): Issue[] { const saved = localStorage.getItem('cityfix_issues'); if (saved) return JSON.parse(saved); localStorage.setItem('cityfix_issues', JSON.stringify(mockIssues)); return mockIssues; }
  private save(items: Issue[]): void { localStorage.setItem('cityfix_issues', JSON.stringify(items)); }
  // MOCK: local collection for inferred GET /api/v1/issues endpoint.
  private localGetAll(): Issue[] { return this.load(); }
  // TODO(USE_MOCK): verify inferred issue endpoint response schema before flipping.
  getAll(): Observable<Issue[]> { return this.USE_MOCK ? of(this.localGetAll()) : this.http.get<Issue[]>('/api/v1/issues'); }
  // MOCK: local item for inferred GET /api/v1/issues/{id} endpoint.
  private localGetById(id: string): Issue | undefined { return this.load().find((issue) => issue.id === id); }
  getById(id: string): Observable<Issue | undefined> { return this.USE_MOCK ? of(this.localGetById(id)) : this.http.get<Issue>(`/api/v1/issues/${id}`); }
  // MOCK: local create for inferred POST /api/v1/issues endpoint.
  private localCreate(input: Omit<Issue, 'id' | 'createdAt' | 'upvotes' | 'comments'>): Issue { const issue: Issue = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString(), upvotes: 0, comments: [] }; const all = this.load(); all.unshift(issue); this.save(all); return issue; }
  create(input: Omit<Issue, 'id' | 'createdAt' | 'upvotes' | 'comments'>): Observable<Issue> { return this.USE_MOCK ? of(this.localCreate(input)) : this.http.post<Issue>('/api/v1/issues', input); }
  // MOCK: local issue administration response for inferred PUT issue endpoints.
  update(id: string, changes: Partial<Issue>): Observable<Issue | undefined> { const all = this.load(); const found = all.find((issue) => issue.id === id); if (found) { Object.assign(found, changes); this.save(all); } return of(found); }
  addComment(id: string, text: string, postedBy: string): Observable<Issue | undefined> { const issue = this.localGetById(id); if (issue) { issue.comments.push({ id: crypto.randomUUID(), issueId: id, text, postedBy, createdAt: new Date().toISOString() } as Comment); this.save(this.load()); } return of(issue); }
  upvote(id: string): Observable<Issue | undefined> { const issue = this.localGetById(id); if (issue) { issue.upvotes++; this.save(this.load()); } return of(issue); }
}
