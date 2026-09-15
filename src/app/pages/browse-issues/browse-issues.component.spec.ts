import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BrowseIssuesComponent{private } from './browse-issues.component';

describe('BrowseIssuesComponent{private', () => {
  it('creates without crashing', () => {
    TestBed.configureTestingModule({
      imports: [BrowseIssuesComponent{private],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(BrowseIssuesComponent{private);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
