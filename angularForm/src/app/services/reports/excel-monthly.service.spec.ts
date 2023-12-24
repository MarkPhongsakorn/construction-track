import { TestBed } from '@angular/core/testing';

import { ExcelMonthlyService } from './excel-monthly.service';

describe('ExcelMonthlyService', () => {
  let service: ExcelMonthlyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelMonthlyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
