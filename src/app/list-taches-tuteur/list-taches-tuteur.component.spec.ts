import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTachesTuteurComponent } from './list-taches-tuteur.component';

describe('ListTachesTuteurComponent', () => {
  let component: ListTachesTuteurComponent;
  let fixture: ComponentFixture<ListTachesTuteurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTachesTuteurComponent]
    });
    fixture = TestBed.createComponent(ListTachesTuteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
