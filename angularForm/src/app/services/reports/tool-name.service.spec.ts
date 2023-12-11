import { TestBed } from '@angular/core/testing';

import { ToolNameService } from './tool-name.service';

describe('ToolNameService', () => {
  let service: ToolNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
