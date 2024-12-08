import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuteurReclamationsComponent } from './tuteur-reclamations.component';

describe('TuteurReclamationsComponent', () => {
  let component: TuteurReclamationsComponent;
  let fixture: ComponentFixture<TuteurReclamationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TuteurReclamationsComponent]
    });
    fixture = TestBed.createComponent(TuteurReclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
