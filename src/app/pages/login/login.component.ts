import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { isAdminRole, Role } from '../../types';

@Component({ standalone: true, imports: [ReactiveFormsModule, RouterModule], templateUrl: './login.component.html', encapsulation: ViewEncapsulation.None })
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);

  selectedRole = signal<Role>('USER');
  error = signal('');
  submitting = signal(false);
  success = signal('');
  // MOCK: local demo credentials make role-specific workspaces testable without a backend.
  readonly demoAccounts: Record<Role, { email: string; password: string }> = {
    SUPER_ADMIN: { email: 'superadmin@cityfix.test', password: 'password123' },
    ADMIN: { email: 'admin@cityfix.test', password: 'password123' },
    USER: { email: 'user@cityfix.test', password: 'password123' },
  };
  form = this.fb.group({
    email: [this.demoAccounts.USER.email, [Validators.required, Validators.email]],
    password: [this.demoAccounts.USER.password, [Validators.required, Validators.minLength(6)]],
  });

  selectRole(role: Role): void {
    this.selectedRole.set(role);
    this.error.set('');
    this.success.set('');
    const account = this.demoAccounts[role];
    this.form.setValue(account);
  }

  onSubmit(): void {
    if (this.form.invalid || this.submitting()) { this.form.markAllAsTouched(); return; }
    this.error.set('');
    this.success.set('');
    this.submitting.set(true);
    const { email, password } = this.form.getRawValue();
    this.auth.login(email!, password!).subscribe((result) => {
      this.submitting.set(false);
      if (!result.success) {
        this.error.set(result.reason === 'PENDING' ? 'Your admin account is pending approval by the Super Admin.' : result.reason === 'REJECTED' ? 'Your admin registration was rejected.' : 'Invalid email or password. Please try again.');
        return;
      }
      const role = this.auth.currentRole();
      this.success.set(`Signed in as ${role === 'SUPER_ADMIN' ? 'a super administrator' : role === 'ADMIN' ? 'an administrator' : 'a resident'}. Redirecting…`);
      this.router.navigate([isAdminRole(role) ? '/admin' : '/dashboard']);
    });
  }
}
