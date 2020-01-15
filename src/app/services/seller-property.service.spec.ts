import { TestBed } from '@angular/core/testing';

import { SellerPropertyService } from './seller-property.service';

describe('SellerPropertyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellerPropertyService = TestBed.get(SellerPropertyService);
    expect(service).toBeTruthy();
  });
});
