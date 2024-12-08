import { TestBed } from '@angular/core/testing';

import { AttestaionService } from './attestaion.service';

describe('AttestaionService', () => {
  let service: AttestaionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttestaionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
