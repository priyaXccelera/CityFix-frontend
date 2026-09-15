import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AnnouncementDetailComponent } from './announcement-detail.component';

describe('AnnouncementDetailComponent', () => {
  it('creates without crashing', () => {
    TestBed.configureTestingModule({
      imports: [AnnouncementDetailComponent],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(AnnouncementDetailComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });
});
