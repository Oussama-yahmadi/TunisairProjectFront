import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteurComponentComponent } from './testeur-component.component';

describe('TesteurComponentComponent', () => {
  let component: TesteurComponentComponent;
  let fixture: ComponentFixture<TesteurComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TesteurComponentComponent]
    });
    fixture = TestBed.createComponent(TesteurComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



