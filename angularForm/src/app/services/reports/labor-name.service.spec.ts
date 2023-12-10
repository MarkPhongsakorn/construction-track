import { TestBed } from '@angular/core/testing';

import { LaborNameService } from './labor-name.service';

describe('LaborNameService', () => {
  let service: LaborNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaborNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
