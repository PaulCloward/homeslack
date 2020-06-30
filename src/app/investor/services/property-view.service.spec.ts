import { TestBed } from '@angular/core/testing';

import { PropertyViewService } from './property-view.service';

describe('PropertyViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropertyViewService = TestBed.get(PropertyViewService);
    expect(service).toBeTruthy();
  });
});
