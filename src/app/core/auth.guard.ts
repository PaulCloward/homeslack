import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{
	
	
	constructor(private mRouter:Router, private mAuthService:AuthenticationService){
	}

	canActivate(
		next:ActivatedRouteSnapshot,
		state:RouterStateSnapshot
	):Observable<boolean> | boolean{

		if(this.mAuthService.authenticated){
			console.log("ISSS AUTHENTICATED");
			return true;

		}

		console.log("NOTTT AUTHENTICATED");
		this.mRouter.navigate(['/lock']);
		return false;
	}
  
}
