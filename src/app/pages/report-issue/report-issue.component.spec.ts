import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ReportIssueComponent } from './report-issue.component';

describe('ReportIssueComponent', () => {
  it('creates without crashing', () => {
    TestBed.configureTestingModule({
      imports: [ReportIssueComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(ReportIssueComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
