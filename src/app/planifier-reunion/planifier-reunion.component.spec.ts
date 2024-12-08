import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanifierReunionComponent } from './planifier-reunion.component';

describe('PlanifierReunionComponent', () => {
  let component: PlanifierReunionComponent;
  let fixture: ComponentFixture<PlanifierReunionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanifierReunionComponent]
    });
    fixture = TestBed.createComponent(PlanifierReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
