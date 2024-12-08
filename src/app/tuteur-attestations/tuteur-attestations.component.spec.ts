import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuteurAttestationsComponent } from './tuteur-attestations.component';

describe('TuteurAttestationsComponent', () => {
  let component: TuteurAttestationsComponent;
  let fixture: ComponentFixture<TuteurAttestationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TuteurAttestationsComponent]
    });
    fixture = TestBed.createComponent(TuteurAttestationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
