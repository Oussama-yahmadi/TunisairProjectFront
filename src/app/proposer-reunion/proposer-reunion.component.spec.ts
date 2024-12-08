import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposerReunionComponent } from './proposer-reunion.component';

describe('ProposerReunionComponent', () => {
  let component: ProposerReunionComponent;
  let fixture: ComponentFixture<ProposerReunionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProposerReunionComponent]
    });
    fixture = TestBed.createComponent(ProposerReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
