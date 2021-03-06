import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { SnackService } from '../services/snack.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInvestorGuard implements CanActivate {
  constructor(
    private snack: SnackService,
    private mAuthService:AuthenticationService
  ) {}


  async canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Promise<boolean> {

    const user = await this.mAuthService.getUser();
    const loggedIn = !!user;

    if (!loggedIn) {
        this.snack.authError('Investor error: must be logged into Kuldasac to view this page');
        return false;
    }

    const roles = await this.mAuthService.getRoles();

    if (roles == null) {
      this.snack.authError('investor error: could not determine your role/perissions of your account in kuldasac');
      return false;
  }

    console.log(roles.role.investor);
    console.log(roles.role.admin);
    if(roles == null || (roles.role.investor == false && roles.role.admin == false)){
      this.snack.authError('Investor error: Not an authorized Kuldasac invesor');
      return false;
    }

    return loggedIn;
  } 
}