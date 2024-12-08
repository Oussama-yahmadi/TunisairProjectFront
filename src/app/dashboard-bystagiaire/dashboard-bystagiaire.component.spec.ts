import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBystagiaireComponent } from './dashboard-bystagiaire.component';

describe('DashboardBystagiaireComponent', () => {
  let component: DashboardBystagiaireComponent;
  let fixture: ComponentFixture<DashboardBystagiaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardBystagiaireComponent]
    });
    fixture = TestBed.createComponent(DashboardBystagiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
