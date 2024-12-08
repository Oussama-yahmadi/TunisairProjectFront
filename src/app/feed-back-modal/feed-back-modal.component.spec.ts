import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedBackModalComponent } from './feed-back-modal.component';

describe('FeedBackModalComponent', () => {
  let component: FeedBackModalComponent;
  let fixture: ComponentFixture<FeedBackModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedBackModalComponent]
    });
    fixture = TestBed.createComponent(FeedBackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
