import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDaschboardComponent } from './admin-daschboard.component';

describe('AdminDaschboardComponent', () => {
  let component: AdminDaschboardComponent;
  let fixture: ComponentFixture<AdminDaschboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDaschboardComponent]
    });
    fixture = TestBed.createComponent(AdminDaschboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
