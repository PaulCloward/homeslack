import { TestBed } from '@angular/core/testing';

import { RecordHomeGuard } from './record-home.guard';

describe('RecordHomeGuard', () => {
  let guard: RecordHomeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RecordHomeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
