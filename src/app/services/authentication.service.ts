import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from as observableFrom, } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authStateGuard:any;

  constructor(private mAngularFireAuth:AngularFireAuth, private mRouter:Router) { }

  createAccount(email:string, password:string):Observable<any>{
    return observableFrom(
      this.mAngularFireAuth.auth.createUserWithEmailAndPassword(email, password)
    );
  }

  login(email:string, password:string):Observable<any>{
  	return observableFrom(
  		this.mAngularFireAuth.auth.signInWithEmailAndPassword(email, password)
  	);
  }

  logout(){
    this.mAngularFireAuth.auth.signOut().then(() => {
       this.mRouter.navigate(['/home']);
    });
  }
  
  get authenticated(): boolean{
    return this.authStateGuard !== null;
  }
}
