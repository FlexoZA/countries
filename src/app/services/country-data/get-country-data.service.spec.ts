import { TestBed } from '@angular/core/testing';

import { GetCountryDataService } from './get-country-data.service';

describe('GetCountryDataService', () => {
  let service: GetCountryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCountryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
