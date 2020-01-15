import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivate{
	constructor(private mRouter:Router, private mFirebaseService:FirebaseService){

	}

	canActivate(
		next:ActivatedRouteSnapshot,
		state:RouterStateSnapshot
	):Observable<boolean> | boolean{

		if(this.mFirebaseService.authenticated){
			console.log("ISSS AUTHENTICATED");
			return true;

		}

		console.log("NOTTT AUTHENTICATED");
		this.mRouter.navigate(['/lock']);
		return false;
	}
  
}
