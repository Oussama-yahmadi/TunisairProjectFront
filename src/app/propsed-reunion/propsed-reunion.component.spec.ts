import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropsedReunionComponent } from './propsed-reunion.component';

describe('PropsedReunionComponent', () => {
  let component: PropsedReunionComponent;
  let fixture: ComponentFixture<PropsedReunionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropsedReunionComponent]
    });
    fixture = TestBed.createComponent(PropsedReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
