import { TestBed } from '@angular/core/testing';

import { ReclamtionServiceService } from './reclamtion-service.service';

describe('ReclamtionServiceService', () => {
  let service: ReclamtionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReclamtionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
