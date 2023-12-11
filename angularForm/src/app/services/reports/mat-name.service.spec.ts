import { TestBed } from '@angular/core/testing';

import { MatNameService } from './mat-name.service';

describe('MatNameService', () => {
  let service: MatNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
