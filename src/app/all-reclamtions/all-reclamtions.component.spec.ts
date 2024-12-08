import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReclamtionsComponent } from './all-reclamtions.component';

describe('AllReclamtionsComponent', () => {
  let component: AllReclamtionsComponent;
  let fixture: ComponentFixture<AllReclamtionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllReclamtionsComponent]
    });
    fixture = TestBed.createComponent(AllReclamtionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
