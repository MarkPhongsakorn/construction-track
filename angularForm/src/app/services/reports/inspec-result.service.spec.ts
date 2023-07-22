import { TestBed } from '@angular/core/testing';

import { InspecResultService } from './inspec-result.service';

describe('InspecResultService', () => {
  let service: InspecResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspecResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
