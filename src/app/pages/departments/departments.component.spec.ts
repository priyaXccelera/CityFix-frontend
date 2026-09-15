import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DepartmentsComponent } from './departments.component';

describe('DepartmentsComponent', () => {
  it('creates without crashing', () => {
    TestBed.configureTestingModule({
      imports: [DepartmentsComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(DepartmentsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
