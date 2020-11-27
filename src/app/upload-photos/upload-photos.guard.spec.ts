import { TestBed } from '@angular/core/testing';

import { UploadPhotosGuard } from './upload-photos.guard';

describe('UploadPhotosGuard', () => {
  let guard: UploadPhotosGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UploadPhotosGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
