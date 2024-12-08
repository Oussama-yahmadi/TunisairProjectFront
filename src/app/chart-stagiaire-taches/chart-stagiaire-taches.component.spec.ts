import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartStagiaireTachesComponent } from './chart-stagiaire-taches.component';

describe('ChartStagiaireTachesComponent', () => {
  let component: ChartStagiaireTachesComponent;
  let fixture: ComponentFixture<ChartStagiaireTachesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartStagiaireTachesComponent]
    });
    fixture = TestBed.createComponent(ChartStagiaireTachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
