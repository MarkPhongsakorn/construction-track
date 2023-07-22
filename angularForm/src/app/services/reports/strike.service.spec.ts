import { TestBed } from '@angular/core/testing';

import { StrikeService } from './strike.service';

describe('StrikeService', () => {
  let service: StrikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
