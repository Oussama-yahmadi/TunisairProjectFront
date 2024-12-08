import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropsedReunionsStagiairesComponent } from './propsed-reunions-stagiaires.component';

describe('PropsedReunionsStagiairesComponent', () => {
  let component: PropsedReunionsStagiairesComponent;
  let fixture: ComponentFixture<PropsedReunionsStagiairesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropsedReunionsStagiairesComponent]
    });
    fixture = TestBed.createComponent(PropsedReunionsStagiairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
