import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CivicDataService } from '../../services/civic-data.service';
import { Department } from '../../types';
@Component({ standalone: true, imports: [ReactiveFormsModule], templateUrl: './departments.component.html', encapsulation: ViewEncapsulation.None })
export class DepartmentsComponent {
  private civic = inject(CivicDataService); private fb = inject(FormBuilder);
  departments = signal<Department[]>([]); editing = signal<Department | null>(null); message = signal('');
  form = this.fb.group({ name: ['', Validators.required], category: ['', Validators.required], description: ['', Validators.required] });
  constructor() { this.refresh(); }
  refresh() { this.civic.getDepartments().subscribe(items => this.departments.set(items)); }
  edit(item: Department) { this.editing.set(item); this.form.setValue({ name: item.name, category: item.category, description: item.description }); }
  cancel() { this.editing.set(null); this.form.reset(); }
  save() { if (this.form.invalid) { this.form.markAllAsTouched(); return; } const value = this.form.getRawValue(); const current = this.editing(); const record: Department = { id: current?.id ?? crypto.randomUUID(), name: value.name!, category: value.category!, description: value.description! }; this.civic.saveDepartment(record).subscribe(() => { this.message.set(current ? 'Department updated.' : 'Department added.'); this.cancel(); this.refresh(); }); }
  remove(item: Department) { if (confirm(`Delete ${item.name}?`)) this.civic.deleteDepartment(item.id).subscribe(() => { this.message.set('Department deleted.'); this.refresh(); }); }
}
