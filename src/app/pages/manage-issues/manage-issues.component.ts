import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IssueStoreService } from '../../services/issue-store.service';
import { CivicDataService } from '../../services/civic-data.service';
import { Department, Issue, IssueStatus, Priority } from '../../types';
@Component({ standalone: true, imports: [FormsModule], templateUrl: './manage-issues.component.html', encapsulation: ViewEncapsulation.None })
export class ManageIssuesComponent {
  private issuesService = inject(IssueStoreService); private civic = inject(CivicDataService);
  issues = signal<Issue[]>([]); departments = signal<Department[]>([]); statusFilter = signal<'all' | IssueStatus>('all'); priorityFilter = signal<'all' | Priority>('all'); departmentFilter = signal('all'); message = signal('');
  statuses: IssueStatus[] = ['reported', 'in-review', 'assigned', 'in-progress', 'resolved', 'rejected']; priorities: Priority[] = ['low', 'medium', 'high', 'urgent'];
  constructor() { this.refresh(); this.civic.getDepartments().subscribe(x => this.departments.set(x)); }
  refresh() { this.issuesService.getAll().subscribe(items => this.issues.set(items.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))); }
  filteredIssues() { return this.issues().filter(issue => (this.statusFilter() === 'all' || issue.status === this.statusFilter()) && (this.priorityFilter() === 'all' || issue.priority === this.priorityFilter()) && (this.departmentFilter() === 'all' || issue.department === this.departmentFilter())); }
  update(issue: Issue, changes: Partial<Issue>) { this.issuesService.update(issue.id, changes).subscribe(() => { this.message.set('Issue updated.'); this.refresh(); }); }
  statusLabel(value: string) { return value.replaceAll('-', ' '); }
}
