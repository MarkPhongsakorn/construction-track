import { TestBed } from '@angular/core/testing';

import { StaWeatherService } from './sta-weather.service';

describe('StaWeatherService', () => {
  let service: StaWeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaWeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
