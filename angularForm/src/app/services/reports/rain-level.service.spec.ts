import { TestBed } from '@angular/core/testing';

import { RainLevelService } from './rain-level.service';

describe('RainLevelService', () => {
  let service: RainLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RainLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
