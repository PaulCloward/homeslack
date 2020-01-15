import { TestBed } from '@angular/core/testing';

import { PropertyFinderService } from './property-finder.service';

describe('PropertyFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropertyFinderService = TestBed.get(PropertyFinderService);
    expect(service).toBeTruthy();
  });
});
