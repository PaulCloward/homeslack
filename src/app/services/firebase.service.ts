import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { IHome } from '../model/IHome';

import { Observable, from as observableFrom, } from 'rxjs';
import { Router } from '@angular/router';
 
import "rxjs/add/operator/filter";
import "rxjs/add/operator/first";
import { IAddress } from '../model/IAddress';

import { IHomeDetails } from '../model/IHomeDetails';

@Injectable()
export class FirebaseService {
  
  public user : Observable<firebase.User>;
  public userUID: string;

  userDate:Observable<any>;
  item: Observable<any>;

  authStateGuard:any;


  readonly KEY_HOME_SELLER:string = 'home_seller';
  readonly KEY_SELLER_CONTACT_INFORMATION:string = 'seller_contact_information';
  readonly KEY_SELLER_HOME_ADDRESS:string = 'seller_home_address';
  readonly KEY_SELLER_HOME_CONCERNS:string = 'seller_home_concerns';
  readonly KEY_SELLER_HOME_DETAILS:string = 'seller_home_details';
  readonly KEY_SELLER_TIME_LINE_OF_SALE:string = 'seller_time_line_of_sale';
  
  userID:string;

  constructor(private mFirestoreStore:AngularFirestore, private db: AngularFireDatabase, private mAngularAuth: AngularFireAuth, private router: Router) {
  		 
  		  this.mAngularAuth.authState.subscribe(user => {
          if(user != null){
            this.userID = user.uid;
          }
        })

        this.mAngularAuth.authState.subscribe((auth) => {
          this.authStateGuard = auth;
        });
  }


  saveSellerHomeAddress(homeAddress:IAddress){
    if(this.userID == null || this.userID == ''){
      return;
    }
    this.mFirestoreStore.collection(this.KEY_SELLER_HOME_ADDRESS).doc(this.userID).set(homeAddress);
  }

  updateSellerHomeAddress(homeAddress:IAddress){
    if(this.userID == null || this.userID == ''){
      return;
    }
    this.mFirestoreStore.collection(this.KEY_SELLER_HOME_ADDRESS).doc(this.userID).update(homeAddress);
  }

  saveSellerDetailsOfHome(details:IHomeDetails){
    if(this.userID == null || this.userID == ''){
      return;
    }
    this.mFirestoreStore.collection(this.KEY_SELLER_HOME_DETAILS).doc(this.userID).set(details);
  }

  updateSellerDetailsOfHome(details:IHomeDetails){
    if(this.userID == null || this.userID == ''){
      return;
    }
    this.mFirestoreStore.collection(this.KEY_SELLER_HOME_DETAILS).doc(this.userID).update(details);
  }



















  ////OLDDDD

  get authenticated(): boolean{
    return this.authStateGuard !== null;
  }

  createAccount(email:string, password:string):Observable<any>{
    return observableFrom(
      this.mAngularAuth.auth.createUserWithEmailAndPassword(email, password)
    );
  }
  
  saveUserPropertyData(newHomeListing:IHome){
    const refHome = this.db.database.ref("users").child(this.getCurrentUser().uid).child("home").push();
    newHomeListing.id = refHome.key;
    this.db.database.ref("users").child(this.getCurrentUser().uid).child("home").child(refHome.key).set(newHomeListing);
  }

  updateSavedUserPropertyData(homeListing:IHome){
     this.db.database.ref("users").child(this.getCurrentUser().uid).child("home").child(homeListing.id).set(homeListing);
  }

  /*
    Saves the users information to firebase database under users/uid
  */
  
  
  login(email:string, password:string):Observable<any>{
  	return observableFrom(
  		this.mAngularAuth.auth.signInWithEmailAndPassword(email, password)
  	);
  }
   
  logout(){
    this.mAngularAuth.auth.signOut().then(() => {
       this.router.navigate(['/home']);
    });
  }

  /*isAuthenticated(): Observable<boolean>{
    return this.user.map(user => user && user.uid !== undefined);
  }*/
  
  getCurrentUser():firebase.User{
    return this.mAngularAuth.auth.currentUser;
  }

  getCurrentUserID():string{
    return this.userUID;
  }

  getHomeListings(listPath):Observable<any>{
    return this.db.list(listPath).valueChanges();
  }
}

