import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CivicDataService } from '../../services/civic-data.service';
import { Announcement } from '../../types';
@Component({ standalone: true, imports: [ReactiveFormsModule, DatePipe], templateUrl: './manage-announcements.component.html', encapsulation: ViewEncapsulation.None })
export class ManageAnnouncementsComponent {
  private civic = inject(CivicDataService); private fb = inject(FormBuilder);
  announcements = signal<Announcement[]>([]); editing = signal<Announcement | null>(null); message = signal('');
  form = this.fb.group({ title: ['', Validators.required], content: ['', Validators.required] });
  constructor() { this.refresh(); }
  refresh() { this.civic.getAnnouncements().subscribe(items => this.announcements.set(items.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))); }
  edit(item: Announcement) { this.editing.set(item); this.form.setValue({ title: item.title, content: item.content }); }
  cancel() { this.editing.set(null); this.form.reset(); }
  save() { if (this.form.invalid) { this.form.markAllAsTouched(); return; } const value = this.form.getRawValue(); const current = this.editing(); const record: Announcement = { id: current?.id ?? crypto.randomUUID(), title: value.title!, content: value.content!, postedBy: current?.postedBy ?? 'Admin', createdAt: current?.createdAt ?? new Date().toISOString() }; this.civic.saveAnnouncement(record).subscribe(() => { this.message.set(current ? 'Announcement updated.' : 'Announcement published.'); this.cancel(); this.refresh(); }); }
  remove(item: Announcement) { if (confirm(`Delete “${item.title}”?`)) this.civic.deleteAnnouncement(item.id).subscribe(() => { this.message.set('Announcement deleted.'); this.refresh(); }); }
}
