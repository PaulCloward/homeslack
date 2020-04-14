import { TestBed } from '@angular/core/testing';

import { PropertySearchCoreLogicService } from './property-search-core-logic.service';

describe('PropertySearchCoreLogicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropertySearchCoreLogicService = TestBed.get(PropertySearchCoreLogicService);
    expect(service).toBeTruthy();
  });
});
