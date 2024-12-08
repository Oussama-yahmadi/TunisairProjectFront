import { TestBed } from '@angular/core/testing';

import { ChartComponentService } from './chart-component.service';

describe('ChartComponentService', () => {
  let service: ChartComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
