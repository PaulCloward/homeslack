import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, from as observableFrom, BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { IUserRoles } from '../model/IUserRoles';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authStateGuard:any;
  private firebaseUser = new BehaviorSubject<firebase.User>(null);
  user$ = this.firebaseUser.asObservable();
  userRoles$: Observable<IUserRoles>;

  constructor(private mAngularAuth:AngularFireAuth, private mRouter:Router) { }

  getUser(): Promise<any> {
    return this.mAngularAuth.authState.pipe(first()).toPromise();
  }

  getRoles():Promise<any> {
    return this.userRoles$.pipe(first()).toPromise();
  }

  createAccount(email:string, password:string):Observable<any>{
    return observableFrom(
      this.mAngularAuth.auth.createUserWithEmailAndPassword(email, password)
    );
  }

  login(email:string, password:string):Observable<any>{
  	return observableFrom(
  		this.mAngularAuth.auth.signInWithEmailAndPassword(email, password)
  	);
  }

  logout(){
    this.mAngularAuth.auth.signOut().then(() => {
       this.mRouter.navigate(['/home']);
    });
  }
  
  get authenticated(): boolean{
    return this.authStateGuard !== null;
  }
}
