import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncadrantPageComponent } from './encadrant-page.component';

describe('EncadrantPageComponent', () => {
  let component: EncadrantPageComponent;
  let fixture: ComponentFixture<EncadrantPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EncadrantPageComponent]
    });
    fixture = TestBed.createComponent(EncadrantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
