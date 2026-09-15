import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { IssueDetailComponent{private } from './issue-detail.component';

describe('IssueDetailComponent{private', () => {
  it('creates without crashing', () => {
    TestBed.configureTestingModule({
      imports: [IssueDetailComponent{private],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(IssueDetailComponent{private);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
