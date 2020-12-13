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
export class AuthSellerGuard implements CanActivate {
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
        this.snack.authError('seller');
        return false;
    }

    const roles = await this.mAuthService.getRoles();

    if (roles == null) {
     // this.snack.authError('seller');
     // return false;
      return true;
  }

    if(roles == null || (roles.role.seller == false && roles.role.admin == false)){
      //this.snack.authError('seller');
      //return false;
      return true;
    }

    return loggedIn;
  } 
}