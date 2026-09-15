import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CivicDataService } from '../../services/civic-data.service';
import { Department, IssueCategory, Priority } from '../../types';
@Component({ standalone: true, imports: [ReactiveFormsModule], templateUrl: './categories.component.html', encapsulation: ViewEncapsulation.None })
export class CategoriesComponent {
  private civic = inject(CivicDataService); private fb = inject(FormBuilder);
  categories = signal<IssueCategory[]>([]); departments = signal<Department[]>([]); editing = signal<IssueCategory | null>(null); message = signal(''); priorities: Priority[] = ['low', 'medium', 'high', 'urgent'];
  form = this.fb.group({ name: ['', Validators.required], departmentId: ['', Validators.required], priority: ['medium' as Priority, Validators.required] });
  constructor() { this.refresh(); this.civic.getDepartments().subscribe(x => this.departments.set(x)); }
  refresh() { this.civic.getCategories().subscribe(items => this.categories.set(items)); }
  edit(item: IssueCategory) { this.editing.set(item); this.form.setValue({ name: item.name, departmentId: item.departmentId, priority: item.priority }); }
  cancel() { this.editing.set(null); this.form.reset({ priority: 'medium' }); }
  save() { if (this.form.invalid) { this.form.markAllAsTouched(); return; } const value = this.form.getRawValue(); const department = this.departments().find(x => x.id === value.departmentId); if (!department) return; const current = this.editing(); const record: IssueCategory = { id: current?.id ?? crypto.randomUUID(), name: value.name!, departmentId: department.id, departmentName: department.name, priority: value.priority! }; this.civic.saveCategory(record).subscribe(() => { this.message.set(current ? 'Category updated.' : 'Category added.'); this.cancel(); this.refresh(); }); }
  remove(item: IssueCategory) { if (confirm(`Delete ${item.name}?`)) this.civic.deleteCategory(item.id).subscribe(() => { this.message.set('Category deleted.'); this.refresh(); }); }
}
