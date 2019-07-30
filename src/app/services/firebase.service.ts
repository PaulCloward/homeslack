import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { IHome } from '../model/IHome';
import { IUser } from '../model/IUser';
import { ITimeframe } from '../model/ITimeframe';
import { AngularFireObject } from 'angularfire2/database';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Http, Headers } from '@angular/http';
 
import "rxjs/add/operator/filter";
import "rxjs/add/operator/first";

@Injectable()
export class FirebaseService {
  
  public user : Observable<firebase.User>;
  public userUID: string;

  userDate:Observable<any>;
  item: Observable<any>;
  
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) {
  		 
  		  this.user = afAuth.authState;

        firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          this.userUID = user.uid;
        }
      });
  }

  createAccount(email:string, password:string):Observable<any>{
    return Observable.fromPromise(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    );
  }
  
  saveUserPropertyData(newHomeListing:IHome){
    const refHome = this.db.database.ref("users").child(this.getCurrentUser().uid).child("home").push();
    console.log("KEY: " + refHome.key);
    newHomeListing.id = refHome.key;
    this.db.database.ref("users").child(this.getCurrentUser().uid).child("home").child(refHome.key).set(newHomeListing);
  }

  updateSavedUserPropertyData(homeListing:IHome){
     this.db.database.ref("users").child(this.getCurrentUser().uid).child("home").child(homeListing.id).set(homeListing);
  }

  /*
    Saves the users information to firebase database under users/uid
  */
  createUserAccount(newUser:IUser){
    this.db.database.ref("users").child(this.getCurrentUser().uid).child("contact").set(newUser);
  }
  
  login(email:string, password:string):Observable<any>{
  	return Observable.fromPromise(
  		this.afAuth.auth.signInWithEmailAndPassword(email, password)
  	);
  }
   
  logout(){
    this.afAuth.auth.signOut().then(() => {
       this.router.navigate(['/home']);
    });
  }

  isAuthenticated(): Observable<boolean>{
    return this.user.map(user => user && user.uid !== undefined);
  }
  
  getCurrentUser():firebase.User{
    return this.afAuth.auth.currentUser;
  }

  getCurrentUserID():string{
    return this.userUID;
  }

  getUserInfo(listPath): Observable<IUser> {   
   return this.db.object<IUser>(listPath).valueChanges();
  }

  getHomeListings(listPath):Observable<any>{
    return this.db.list(listPath).valueChanges();
  }
}

