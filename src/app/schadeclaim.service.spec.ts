import { TestBed } from '@angular/core/testing';

import { SchadeclaimService } from './schadeclaim.service';

describe('SchadeclaimService', () => {
  let service: SchadeclaimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchadeclaimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
