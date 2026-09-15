import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IssueStoreService } from '../../services/issue-store.service';
import { CivicDataService } from '../../services/civic-data.service';
import { Issue, User } from '../../types';
@Component({ standalone: true, imports: [RouterModule], templateUrl: './admin-dashboard.component.html', encapsulation: ViewEncapsulation.None })
export class AdminDashboardComponent {
  private issueService = inject(IssueStoreService); private civic = inject(CivicDataService); issues = signal<Issue[]>([]); users = signal<User[]>([]); announcements = signal(0);
  constructor() { this.issueService.getAll().subscribe(x => this.issues.set(x)); this.civic.getUsers().subscribe(x => this.users.set(x)); this.civic.getAnnouncements().subscribe(x => this.announcements.set(x.length)); }
  count(status: string) { return this.issues().filter(issue => issue.status === status).length; }
  activeResidents() { return this.users().filter(user => user.role === 'USER' && user.active).length; }
  openIssues() { return this.issues().filter(issue => !['resolved', 'rejected'].includes(issue.status)).length; }
  recentIssues() { return [...this.issues()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5); }
  departmentBreakdown() { const counts = new Map<string, number>(); this.issues().forEach(issue => counts.set(issue.department || 'Unassigned', (counts.get(issue.department || 'Unassigned') ?? 0) + 1)); return [...counts.entries()].map(([name, count]) => ({ name, count })); }
}
