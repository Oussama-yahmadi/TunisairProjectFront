import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTuteurComponent } from './navbar-tuteur.component';

describe('NavbarTuteurComponent', () => {
  let component: NavbarTuteurComponent;
  let fixture: ComponentFixture<NavbarTuteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarTuteurComponent]
    });
    fixture = TestBed.createComponent(NavbarTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
