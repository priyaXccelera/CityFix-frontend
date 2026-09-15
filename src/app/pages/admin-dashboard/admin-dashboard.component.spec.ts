import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';

describe('AdminDashboardComponent', () => {
  it('creates without crashing', () => {
    TestBed.configureTestingModule({
      imports: [AdminDashboardComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(AdminDashboardComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
