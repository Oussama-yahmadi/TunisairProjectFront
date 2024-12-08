import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedBackStagiaireComponent } from './feed-back-stagiaire.component';

describe('FeedBackStagiaireComponent', () => {
  let component: FeedBackStagiaireComponent;
  let fixture: ComponentFixture<FeedBackStagiaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedBackStagiaireComponent]
    });
    fixture = TestBed.createComponent(FeedBackStagiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
