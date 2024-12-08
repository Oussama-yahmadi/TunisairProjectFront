import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatttttComponent } from './chattttt.component';

describe('ChatttttComponent', () => {
  let component: ChatttttComponent;
  let fixture: ComponentFixture<ChatttttComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChatttttComponent]
    });
    fixture = TestBed.createComponent(ChatttttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
