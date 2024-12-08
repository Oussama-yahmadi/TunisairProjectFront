import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffresComponentComponent } from './offres-component.component';

describe('OffresComponentComponent', () => {
  let component: OffresComponentComponent;
  let fixture: ComponentFixture<OffresComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffresComponentComponent]
    });
    fixture = TestBed.createComponent(OffresComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
