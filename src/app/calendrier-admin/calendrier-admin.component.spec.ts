import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendrierAdminComponent } from './calendrier-admin.component';

describe('CalendrierAdminComponent', () => {
  let component: CalendrierAdminComponent;
  let fixture: ComponentFixture<CalendrierAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendrierAdminComponent]
    });
    fixture = TestBed.createComponent(CalendrierAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
