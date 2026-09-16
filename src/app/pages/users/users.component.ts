import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CivicDataService } from '../../services/civic-data.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types';

@Component({ standalone: true, imports: [FormsModule, ReactiveFormsModule], templateUrl: './users.component.html', encapsulation: ViewEncapsulation.None })
export class UsersComponent {
  private civic = inject(CivicDataService);
  private fb = inject(FormBuilder);
  auth = inject(AuthService);
  users = signal<User[]>([]);
  query = signal('');
  message = signal('');
  addAdminOpen = signal(false);
  isCreatingAdmin = signal(false);
  addAdminError = signal('');
  addAdminSuccess = signal('');
  addAdminForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor() { this.refresh(); }

  isSuperAdmin(): boolean { return this.auth.currentRole() === 'SUPER_ADMIN'; }

  refresh() {
    this.civic.getUsers().subscribe(items => this.users.set(items.filter(item => item.role === 'USER' || (this.isSuperAdmin() && item.role === 'ADMIN'))));
  }

  filteredUsers() { const term = this.query().toLowerCase().trim(); return this.users().filter(user => !term || `${user.name} ${user.email} ${user.area}`.toLowerCase().includes(term)); }

  canToggle(user: User): boolean { return user.role === 'USER' || (this.isSuperAdmin() && user.role === 'ADMIN'); }

  toggle(user: User) {
    if (!this.canToggle(user)) return;
    const action = user.active ? 'deactivate' : 'activate';
    if (!confirm(`Are you sure you want to ${action} ${user.name}?`)) return;
    this.civic.updateUser(user.id, { active: !user.active }).subscribe(() => { this.message.set(`${user.name} ${action}d.`); this.refresh(); });
  }

  openAddAdmin(): void {
    if (!this.isSuperAdmin()) return;
    this.addAdminForm.reset();
    this.addAdminError.set('');
    this.addAdminSuccess.set('');
    this.addAdminOpen.set(true);
  }

  closeAddAdmin(): void {
    if (!this.isCreatingAdmin()) this.addAdminOpen.set(false);
  }

  submitAddAdmin(): void {
    if (!this.isSuperAdmin()) {
      this.addAdminError.set('You do not have permission to create administrator accounts.');
      return;
    }
    if (this.addAdminForm.invalid) {
      this.addAdminForm.markAllAsTouched();
      return;
    }
    this.isCreatingAdmin.set(true);
    this.addAdminError.set('');
    const { name, email, password } = this.addAdminForm.getRawValue();
    this.auth.createAdmin(name, email, password).subscribe({
      next: () => {
        this.isCreatingAdmin.set(false);
        this.addAdminSuccess.set(`${name} has been added as an administrator.`);
      },
      error: (error: HttpErrorResponse | Error) => {
        this.isCreatingAdmin.set(false);
        if (error instanceof HttpErrorResponse && error.status === 403) this.addAdminError.set('You do not have permission to create administrator accounts.');
        else if (error instanceof HttpErrorResponse && error.status === 409) this.addAdminError.set('An account with this email already exists.');
        else this.addAdminError.set(error instanceof Error && error.message ? error.message : 'We could not create the administrator. Please try again.');
      },
    });
  }
}
