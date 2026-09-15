import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AnnouncementsComponent } from './announcements.component';

describe('AnnouncementsComponent', () => {
  it('creates without crashing', () => {
    TestBed.configureTestingModule({
      imports: [AnnouncementsComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(AnnouncementsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
