import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { AuthInvestorGuard } from './auth-investor.guard';

describe('AuthInvestorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInvestorGuard]
    });
  });

  it('should ...', inject([AuthInvestorGuard], (guard: AuthInvestorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
