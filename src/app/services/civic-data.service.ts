import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mockAnnouncements, mockCategories, mockDepartments, mockUsers } from '../data/mock-data';
import { Announcement, Department, IssueCategory, User } from '../types';

@Injectable({ providedIn: 'root' })
export class CivicDataService {
  readonly USE_MOCK = true;
  private load<T>(key: string, seed: T[]): T[] { const saved = localStorage.getItem(key); if (saved) return JSON.parse(saved); localStorage.setItem(key, JSON.stringify(seed)); return seed; }
  private save<T>(key: string, records: T[]): void { localStorage.setItem(key, JSON.stringify(records)); }
  // MOCK: local result for inferred GET /api/v1/departments endpoint.
  getDepartments(): Observable<Department[]> { return of(this.load('cityfix_departments', mockDepartments)); }
  // MOCK: local result for inferred POST/PUT/DELETE /api/v1/departments endpoints.
  saveDepartment(record: Department): Observable<Department> { const all = this.load('cityfix_departments', mockDepartments); const index = all.findIndex((item) => item.id === record.id); index >= 0 ? all.splice(index, 1, record) : all.unshift(record); this.save('cityfix_departments', all); return of(record); }
  deleteDepartment(id: string): Observable<void> { this.save('cityfix_departments', this.load('cityfix_departments', mockDepartments).filter((item) => item.id !== id)); return of(void 0); }
  // MOCK: local result for inferred GET /api/v1/categories endpoint.
  getCategories(): Observable<IssueCategory[]> { return of(this.load('cityfix_categories', mockCategories)); }
  // MOCK: local result for inferred POST/PUT/DELETE /api/v1/categories endpoints.
  saveCategory(record: IssueCategory): Observable<IssueCategory> { const all = this.load('cityfix_categories', mockCategories); const index = all.findIndex((item) => item.id === record.id); index >= 0 ? all.splice(index, 1, record) : all.unshift(record); this.save('cityfix_categories', all); return of(record); }
  deleteCategory(id: string): Observable<void> { this.save('cityfix_categories', this.load('cityfix_categories', mockCategories).filter((item) => item.id !== id)); return of(void 0); }
  // MOCK: local result for inferred GET /api/v1/announcements endpoint.
  getAnnouncements(): Observable<Announcement[]> { return of(this.load('cityfix_announcements', mockAnnouncements)); }
  getAnnouncement(id: string): Observable<Announcement | undefined> { return of(this.load('cityfix_announcements', mockAnnouncements).find((item) => item.id === id)); }
  // MOCK: local result for inferred POST/PUT/DELETE /api/v1/announcements endpoints.
  saveAnnouncement(record: Announcement): Observable<Announcement> { const all = this.load('cityfix_announcements', mockAnnouncements); const index = all.findIndex((item) => item.id === record.id); index >= 0 ? all.splice(index, 1, record) : all.unshift(record); this.save('cityfix_announcements', all); return of(record); }
  deleteAnnouncement(id: string): Observable<void> { this.save('cityfix_announcements', this.load('cityfix_announcements', mockAnnouncements).filter((item) => item.id !== id)); return of(void 0); }
  // MOCK: local resident collection shared with authentication's local user store.
  getUsers(): Observable<User[]> { return of(this.load('cityfix_users', mockUsers)); }
  updateUser(id: string, changes: Partial<User>): Observable<User | undefined> { const all = this.load('cityfix_users', mockUsers); const user = all.find((item) => item.id === id); if (user) { Object.assign(user, changes); this.save('cityfix_users', all); } return of(user); }
}
