import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AccessDeniedComponent } from './access-denied.component';

describe('AccessDeniedComponent', () => {
  it('creates without crashing', () => {
    TestBed.configureTestingModule({
      imports: [AccessDeniedComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(AccessDeniedComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
