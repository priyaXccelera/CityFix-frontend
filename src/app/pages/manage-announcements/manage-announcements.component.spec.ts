import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ManageAnnouncementsComponent } from './manage-announcements.component';

describe('ManageAnnouncementsComponent', () => {
  it('creates without crashing', () => {
    TestBed.configureTestingModule({
      imports: [ManageAnnouncementsComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(ManageAnnouncementsComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
