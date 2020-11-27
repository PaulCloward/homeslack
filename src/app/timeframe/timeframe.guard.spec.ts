import { TestBed } from '@angular/core/testing';

import { TimeframeGuard } from './timeframe.guard';

describe('TimeframeGuard', () => {
  let guard: TimeframeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TimeframeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
