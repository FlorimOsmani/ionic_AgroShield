import { TestBed } from '@angular/core/testing';

import { PerceelService } from './perceel.service';

describe('PerceelService', () => {
  let service: PerceelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerceelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
