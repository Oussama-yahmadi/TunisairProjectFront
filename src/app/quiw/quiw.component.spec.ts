import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiwComponent } from './quiw.component';

describe('QuiwComponent', () => {
  let component: QuiwComponent;
  let fixture: ComponentFixture<QuiwComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuiwComponent]
    });
    fixture = TestBed.createComponent(QuiwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
