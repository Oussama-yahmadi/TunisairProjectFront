import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuteursAdminComponentComponent } from './tuteurs-admin-component.component';

describe('TuteursAdminComponentComponent', () => {
  let component: TuteursAdminComponentComponent;
  let fixture: ComponentFixture<TuteursAdminComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TuteursAdminComponentComponent]
    });
    fixture = TestBed.createComponent(TuteursAdminComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
