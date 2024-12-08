import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeComponentComponent } from './demande-component.component';

describe('DemandeComponentComponent', () => {
  let component: DemandeComponentComponent;
  let fixture: ComponentFixture<DemandeComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeComponentComponent]
    });
    fixture = TestBed.createComponent(DemandeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
