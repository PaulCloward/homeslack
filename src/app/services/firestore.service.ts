import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable, from as observableFrom, } from 'rxjs';
import "rxjs/add/operator/filter";
import "rxjs/add/operator/first";
import { PropertyDetails } from '../class/PropertyDetails';
import { Seller } from '../class/Seller';
import { IInvestor } from '../model/IInvestor';
import { IInvestorInformation } from '../model/IInvestorInformation';
import { IUserRoles } from '../model/IUserRoles';
import { ISellerInformation } from '../model/ISellerInformation';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  KEY_SELLER_CONTACT_INFORMATION:string = 'seller_contact_information';
  KEY_SELLER_PROPERTY_ADDRESS:string = 'seller_property_address';
  KEY_SELLER_PROPERTY_DETAILS:string = 'seller_property_details';
  KEY_INVESTOR_INFORMATION:string = 'investor_information';
  KEY_SELLER_INFORMATION:string = 'seller_information';
  KEY_USER_LIST = "user_roles_list";
  KEY_PROPERTY_LISTINGS_PUBLIC = "property_listings_public";
  KEY_PROPERTY_INDIVIDUAL_SELLER = "property_individual_seller";
  KEY_PROPERTY_INDIVIDUAL_INVESTOR = "property_individual_investor";
  KEY_INVESTOR_WATCH_LIST = "property_investor_watch_list";
  KEY_INVESTOR_OFFERS_MADE = "property_investor_offers_made";
  KEY_INVESTOR_UNDER_CONTRACT = "property_investor_under_contract";


  constructor(private mAngularFirestore:AngularFirestore, private mAngularAuth: AngularFireAuth) {
  		
  
  }

  saveSellerContactInformation(userID:string, sellerContactInfo:Seller):Promise<string>{
    if(userID == null || userID == ''){
      console.log("User UID did not exist");
      return;
    }
  
    return this.mAngularFirestore.collection(this.KEY_SELLER_CONTACT_INFORMATION).doc(userID).set(sellerContactInfo)
    .then(() => { return 'success'})
    .catch(error=> {return error});
  }

  getSellerContactInformation(userUID):Observable<Seller>{
    return  this.mAngularFirestore.collection(this.KEY_SELLER_CONTACT_INFORMATION).doc<Seller>(userUID).valueChanges();
  }
  
  saveSellerPropertyDetails(userID:string,propertyDetails:PropertyDetails):Promise<string>{
    if(userID == null || userID == ''){
      return;
    }
    this.mAngularFirestore.collection(this.KEY_SELLER_PROPERTY_DETAILS).doc(userID).set(propertyDetails)
    .then(() => { return 'success'})
    .catch(error=> {return error});;
  }

  updateSellerPropertyDetails(userID:string,propertyDetails:PropertyDetails){
    if(userID == null || userID == ''){
      return;
    }
    this.mAngularFirestore.collection(this.KEY_SELLER_PROPERTY_DETAILS).doc(userID).update(propertyDetails);
  }

  getSellerPropertyDetails(userUID:string):Observable<any>{
    return this.mAngularFirestore.collection(this.KEY_SELLER_PROPERTY_DETAILS).doc(userUID).valueChanges();
  }

  getAllSellerPropertyDetails(){
    return this.mAngularFirestore.collection(this.KEY_SELLER_PROPERTY_DETAILS).valueChanges();
  }

  getInvestorInformation(userUID:string):Observable<any>{
    return this.mAngularFirestore.collection(this.KEY_INVESTOR_INFORMATION).doc(userUID).valueChanges();
  }

  saveInvestorInformation(userUID:string, investorInformation:IInvestorInformation):Promise<void>{
    return this.mAngularFirestore.collection(this.KEY_INVESTOR_INFORMATION).doc(userUID).set(investorInformation);
  }

  saveSellerInformation(uid:string,sellerInformation:ISellerInformation):Promise<any>{
    return this.mAngularFirestore.collection(this.KEY_SELLER_INFORMATION).doc(uid).set(sellerInformation);
  }

  saveUserRoles(uuid:string,userInformation:IUserRoles):Promise<any>{
    return this.mAngularFirestore.collection(this.KEY_USER_LIST).doc(uuid).set(userInformation);
  }

  getUserRoles(uuid:string):Observable<any>{
    return this.mAngularFirestore.collection(this.KEY_USER_LIST).doc(uuid).valueChanges();
  }

  savePropertyToPublicListing(propertyDetails:PropertyDetails){  
    return this.mAngularFirestore.collection(this.KEY_PROPERTY_LISTINGS_PUBLIC).doc(propertyDetails.address.street).set(propertyDetails);
  }

  getPublicPropertyListings(){
    return this.mAngularFirestore.collection(this.KEY_PROPERTY_LISTINGS_PUBLIC).valueChanges();
  }

  saveFirstPropertyToIndividualSeller(uuid:string, propertyDetails:PropertyDetails):Promise<void>{
    
    return this.mAngularFirestore.collection(this.KEY_PROPERTY_INDIVIDUAL_SELLER).doc(uuid).set({
      property_listings: firebase.firestore.FieldValue.arrayUnion(propertyDetails)
    });
  }

  savePropertyToIndividualSeller(uuid:string, propertyDetails:PropertyDetails):Promise<void>{
    return this.mAngularFirestore.collection(this.KEY_PROPERTY_INDIVIDUAL_SELLER).doc(uuid).update({
      property_listings: firebase.firestore.FieldValue.arrayUnion(propertyDetails)
    });
  }

  getIndividualSellersProperties(uuid:string):Observable<any>{
    return this.mAngularFirestore.collection(this.KEY_PROPERTY_INDIVIDUAL_SELLER).doc(uuid).valueChanges();
  }

  

  addPropertyToInvestorWatchList(uuid:string, propertyDetails:PropertyDetails){
    this.mAngularFirestore.collection(this.KEY_INVESTOR_WATCH_LIST).doc(uuid).update({
      watch_list: firebase.firestore.FieldValue.arrayUnion(propertyDetails)
    }).catch(error => {

      console.log("error adding to watch list (lets try again): " + error)

      this.mAngularFirestore.collection(this.KEY_INVESTOR_WATCH_LIST).doc(uuid).set({
        watch_list: firebase.firestore.FieldValue.arrayUnion(propertyDetails)
      }).then(success => {
        console.log("added property to empty watch list");
      }).catch(error => {
        console.log("Could not add property to empty watch list: " + error);
      })
    });
  }

  deletePropertFromInvestorWatchList(uuid:string, propertyDetails:PropertyDetails){
    this.mAngularFirestore.collection(this.KEY_INVESTOR_WATCH_LIST).doc(uuid).update({
      watch_list: firebase.firestore.FieldValue.arrayRemove(propertyDetails)
    }).catch(error => {

      console.log("error deleting from watch list: " + error)

    
    });
  }


 getInvestorWatchList(uuid:string):Observable<any>{
  return this.mAngularFirestore.collection(this.KEY_INVESTOR_WATCH_LIST).doc(uuid).valueChanges();
 }


 addPropertyToInvestorOfferMadeList(uuid:string, propertyDetails:PropertyDetails){
    this.mAngularFirestore.collection(this.KEY_INVESTOR_OFFERS_MADE).doc(uuid).update({
      offers_made: firebase.firestore.FieldValue.arrayUnion(propertyDetails)
    }).catch(error => {

      console.log("error adding to offer made list (lets try again): " + error)

      this.mAngularFirestore.collection(this.KEY_INVESTOR_OFFERS_MADE).doc(uuid).set({
        offers_made: firebase.firestore.FieldValue.arrayUnion(propertyDetails)
      }).then(success => {
        console.log("added property to empty offer made list");
      }).catch(error => {
        console.log("Could not add property to empty offer made list: " + error);
      })
    });
  }

  getInvestorOffersMadeList(uuid:string):Observable<any>{
      return this.mAngularFirestore.collection(this.KEY_INVESTOR_OFFERS_MADE).doc(uuid).valueChanges();
  }
}
