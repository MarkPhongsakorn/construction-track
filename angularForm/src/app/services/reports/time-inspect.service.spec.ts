import { TestBed } from '@angular/core/testing';

import { TimeInspectService } from './time-inspect.service';

describe('TimeInspectService', () => {
  let service: TimeInspectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeInspectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
