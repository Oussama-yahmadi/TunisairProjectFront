import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarStagiaireComponent } from './navbar-stagiaire.component';

describe('NavbarStagiaireComponent', () => {
  let component: NavbarStagiaireComponent;
  let fixture: ComponentFixture<NavbarStagiaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarStagiaireComponent]
    });
    fixture = TestBed.createComponent(NavbarStagiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
