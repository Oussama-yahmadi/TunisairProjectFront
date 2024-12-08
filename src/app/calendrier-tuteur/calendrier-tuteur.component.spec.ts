import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierTuteurComponent } from './calendrier-tuteur.component';

describe('CalendrierTuteurComponent', () => {
  let component: CalendrierTuteurComponent;
  let fixture: ComponentFixture<CalendrierTuteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendrierTuteurComponent]
    });
    fixture = TestBed.createComponent(CalendrierTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
