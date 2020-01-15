import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable, from as observableFrom, } from 'rxjs';
import "rxjs/add/operator/filter";
import "rxjs/add/operator/first";
import { PropertyDetails } from '../class/PropertyDetails';
import { Seller } from '../class/Seller';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  readonly KEY_SELLER_CONTACT_INFORMATION:string = 'seller_contact_information';
  readonly KEY_SELLER_PROPERTY_ADDRESS:string = 'seller_property_address';
  readonly KEY_SELLER_PROPERTY_DETAILS:string = 'seller_property_details';

  constructor(private mAngularFiretore:AngularFirestore, private mAngularAuth: AngularFireAuth) {
  		
  
  }

  saveSellerContactInformation(userID:string, sellerContactInfo:Seller):Promise<string>{
    if(userID == null || userID == ''){
      console.log("User UID did not exist");
      return;
    }
  
    return this.mAngularFiretore.collection(this.KEY_SELLER_CONTACT_INFORMATION).doc(userID).set(sellerContactInfo)
    .then(() => { return 'success'})
    .catch(error=> {return error});
  }

  getSellerContactInformation(userUID):Observable<Seller>{
   
    return  this.mAngularFiretore.collection(this.KEY_SELLER_CONTACT_INFORMATION).doc<Seller>(userUID).valueChanges();
  }
  
  saveSellerPropertyDetails(userID:string,propertyDetails:PropertyDetails):Promise<string>{
    if(userID == null || userID == ''){
      return;
    }
    this.mAngularFiretore.collection(this.KEY_SELLER_PROPERTY_DETAILS).doc(userID).set(propertyDetails)
    .then(() => { return 'success'})
    .catch(error=> {return error});;
  }

  updateSellerPropertyDetails(userID:string,propertyDetails:PropertyDetails){
    if(userID == null || userID == ''){
      return;
    }
    this.mAngularFiretore.collection(this.KEY_SELLER_PROPERTY_DETAILS).doc(userID).update(propertyDetails);
  }

  getSellerPropertyDetails(userUID:string):Observable<any>{
    console.log(userUID);
    return this.mAngularFiretore.collection(this.KEY_SELLER_PROPERTY_DETAILS).doc(userUID).valueChanges();
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
}
