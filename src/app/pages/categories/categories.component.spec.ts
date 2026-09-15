import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CategoriesComponent } from './categories.component';

describe('CategoriesComponent', () => {
  it('creates without crashing', () => {
    TestBed.configureTestingModule({
      imports: [CategoriesComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(CategoriesComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
