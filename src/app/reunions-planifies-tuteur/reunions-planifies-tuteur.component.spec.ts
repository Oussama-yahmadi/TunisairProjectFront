import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionsPlanifiesTuteurComponent } from './reunions-planifies-tuteur.component';

describe('ReunionsPlanifiesTuteurComponent', () => {
  let component: ReunionsPlanifiesTuteurComponent;
  let fixture: ComponentFixture<ReunionsPlanifiesTuteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReunionsPlanifiesTuteurComponent]
    });
    fixture = TestBed.createComponent(ReunionsPlanifiesTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
