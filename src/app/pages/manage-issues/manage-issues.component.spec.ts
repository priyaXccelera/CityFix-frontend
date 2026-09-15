import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ManageIssuesComponent } from './manage-issues.component';

describe('ManageIssuesComponent', () => {
  it('creates without crashing', () => {
    TestBed.configureTestingModule({
      imports: [ManageIssuesComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(ManageIssuesComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
