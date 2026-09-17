import { DatePipe } from '@angular/common';
import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types';

@Component({ standalone: true, imports: [DatePipe], templateUrl: './pending-admin-requests.component.html', encapsulation: ViewEncapsulation.None })
export class PendingAdminRequestsComponent {
  private auth = inject(AuthService);
  requests = signal<User[]>([]);
  loading = signal(true);
  message = signal('');
  error = signal('');
  processingId = signal<string | null>(null);
  confirmation = signal<{ user: User; action: 'approve' | 'reject' } | null>(null);

  constructor() { this.loadRequests(); }

  loadRequests(): void {
    this.loading.set(true);
    this.error.set('');
    this.auth.getPendingAdminRequests().subscribe({
      next: (requests) => { this.requests.set(requests); this.loading.set(false); },
      error: () => { this.error.set('We could not load pending admin requests. Please try again.'); this.loading.set(false); },
    });
  }

  confirmAction(user: User, action: 'approve' | 'reject'): void { this.confirmation.set({ user, action }); }
  cancelAction(): void { if (!this.processingId()) this.confirmation.set(null); }

  completeAction(): void {
    const confirmation = this.confirmation();
    if (!confirmation) return;
    const { user, action } = confirmation;
    this.processingId.set(user.id);
    this.error.set('');
    const request = action === 'approve' ? this.auth.approveAdminRequest(user.id) : this.auth.rejectAdminRequest(user.id);
    request.subscribe({
      next: () => {
        this.requests.update((items) => items.filter((item) => item.id !== user.id));
        this.message.set(`${user.name}'s admin request was ${action === 'approve' ? 'approved' : 'rejected'}.`);
        this.processingId.set(null);
        this.confirmation.set(null);
      },
      error: () => {
        this.error.set(`We could not ${action} this admin request. Please try again.`);
        this.processingId.set(null);
        this.confirmation.set(null);
      },
    });
  }
}
