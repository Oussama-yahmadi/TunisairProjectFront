import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStagiaireModalComponent } from './add-stagiaire-modal.component';

describe('AddStagiaireModalComponent', () => {
  let component: AddStagiaireModalComponent;
  let fixture: ComponentFixture<AddStagiaireModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStagiaireModalComponent]
    });
    fixture = TestBed.createComponent(AddStagiaireModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
