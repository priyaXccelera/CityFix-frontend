import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MyIssuesComponent } from './my-issues.component';

describe('MyIssuesComponent', () => {
  it('creates without crashing', () => {
    TestBed.configureTestingModule({
      imports: [MyIssuesComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(MyIssuesComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
