import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  it('creates without crashing', () => {
    TestBed.configureTestingModule({
      imports: [ForgotPasswordComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(ForgotPasswordComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
