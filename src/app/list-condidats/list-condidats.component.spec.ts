import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCondidatsComponent } from './list-condidats.component';

describe('ListCondidatsComponent', () => {
  let component: ListCondidatsComponent;
  let fixture: ComponentFixture<ListCondidatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCondidatsComponent]
    });
    fixture = TestBed.createComponent(ListCondidatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
