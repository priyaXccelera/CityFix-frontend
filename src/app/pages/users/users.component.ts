import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CivicDataService } from '../../services/civic-data.service';
import { User } from '../../types';
@Component({ standalone: true, imports: [FormsModule], templateUrl: './users.component.html', encapsulation: ViewEncapsulation.None })
export class UsersComponent {
  private civic = inject(CivicDataService); users = signal<User[]>([]); query = signal(''); message = signal('');
  constructor() { this.refresh(); }
  refresh() { this.civic.getUsers().subscribe(items => this.users.set(items.filter(item => item.role === 'USER'))); }
  filteredUsers() { const term = this.query().toLowerCase().trim(); return this.users().filter(user => !term || `${user.name} ${user.email} ${user.area}`.toLowerCase().includes(term)); }
  toggle(user: User) { const action = user.active ? 'deactivate' : 'activate'; if (!confirm(`Are you sure you want to ${action} ${user.name}?`)) return; this.civic.updateUser(user.id, { active: !user.active }).subscribe(() => { this.message.set(`${user.name} ${action}d.`); this.refresh(); }); }
}
