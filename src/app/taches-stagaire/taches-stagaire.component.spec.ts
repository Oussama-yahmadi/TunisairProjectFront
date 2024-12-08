import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TachesStagaireComponent } from './taches-stagaire.component';

describe('TachesStagaireComponent', () => {
  let component: TachesStagaireComponent;
  let fixture: ComponentFixture<TachesStagaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TachesStagaireComponent]
    });
    fixture = TestBed.createComponent(TachesStagaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
