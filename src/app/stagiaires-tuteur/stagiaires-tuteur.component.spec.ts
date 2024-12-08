import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagiairesTuteurComponent } from './stagiaires-tuteur.component';

describe('StagiairesTuteurComponent', () => {
  let component: StagiairesTuteurComponent;
  let fixture: ComponentFixture<StagiairesTuteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StagiairesTuteurComponent]
    });
    fixture = TestBed.createComponent(StagiairesTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
