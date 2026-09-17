import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../types';

@Component({ standalone: true, imports: [ReactiveFormsModule, RouterModule], templateUrl: './signup.component.html', encapsulation: ViewEncapsulation.None })
export class SignupComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  error = signal('');
  success = signal('');
  form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    area: ['', Validators.required],
    phone: ['', Validators.required],
    requestedRole: ['USER' as Role, Validators.required],
  });

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.error.set('');
    this.success.set('');
    const value = this.form.getRawValue();
    this.auth.signup(value.name, value.email, value.password, value.area, value.phone, value.requestedRole).subscribe((result) => {
      if (!result.success) {
        this.error.set(result.reason === 'SUPER_ADMIN_EXISTS' ? 'A Super Admin already exists for this system. Please register as Admin or User.' : result.reason === 'DUPLICATE_EMAIL' ? 'An account with this email already exists.' : 'We could not create your account. Please try again.');
        return;
      }
      if (value.requestedRole === 'ADMIN') {
        this.success.set("Your admin account has been created and is pending approval by the Super Admin. You'll be able to log in once approved.");
        this.form.disable();
        return;
      }
      this.router.navigate([value.requestedRole === 'SUPER_ADMIN' ? '/admin' : '/dashboard']);
    });
  }
}
