import { TestBed } from '@angular/core/testing';

import { ExcelWeeklyService } from './excel-weekly.service';

describe('ExcelWeeklyService', () => {
  let service: ExcelWeeklyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelWeeklyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
