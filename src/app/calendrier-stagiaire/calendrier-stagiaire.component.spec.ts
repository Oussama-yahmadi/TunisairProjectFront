import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierStagiaireComponent } from './calendrier-stagiaire.component';

describe('CalendrierStagiaireComponent', () => {
  let component: CalendrierStagiaireComponent;
  let fixture: ComponentFixture<CalendrierStagiaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendrierStagiaireComponent]
    });
    fixture = TestBed.createComponent(CalendrierStagiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
