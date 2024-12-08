import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CHATBOTCOMPONENTSTAGIAIREComponent } from './chatbotcomponentstagiaire.component';

describe('CHATBOTCOMPONENTSTAGIAIREComponent', () => {
  let component: CHATBOTCOMPONENTSTAGIAIREComponent;
  let fixture: ComponentFixture<CHATBOTCOMPONENTSTAGIAIREComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CHATBOTCOMPONENTSTAGIAIREComponent]
    });
    fixture = TestBed.createComponent(CHATBOTCOMPONENTSTAGIAIREComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
