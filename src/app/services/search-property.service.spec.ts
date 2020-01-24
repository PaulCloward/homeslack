import { TestBed } from '@angular/core/testing';

import { SearchPropertyService } from './search-property.service';

describe('SearchPropertyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchPropertyService = TestBed.get(SearchPropertyService);
    expect(service).toBeTruthy();
  });
});
