import { TestBed } from '@angular/core/testing';

import { PropertySearchEstatedService } from './property-search-estated.service';

describe('PropertySearchEstatedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropertySearchEstatedService = TestBed.get(PropertySearchEstatedService);
    expect(service).toBeTruthy();
  });
});
