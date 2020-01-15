import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Seller } from '../../class/Seller';
import { FirestoreService } from '../../services/firestore.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { PropertyDetails } from '../../class/PropertyDetails';

@Component({
  selector: 'app-seller-account',
  templateUrl: './seller-account.component.html',
  styleUrls: ['./seller-account.component.css']
})
export class SellerAccountComponent implements OnInit, OnDestroy {

  mSeller:Seller;
  mSellerPropertyDetails:PropertyDetails;
  mUserID:string;

  subscriptionAuthState:Subscription;
  subscriptionSeller:Subscription;
  subscriptionSellerPropertyDetails:Subscription;

  constructor(private mRouter:Router, private mFirestoreService: FirestoreService, private mAuth:AngularFireAuth) { 
  }

  ngOnInit() {
    
      if(this.subscriptionAuthState != null){
        this.subscriptionAuthState.unsubscribe();
      }
     
      this.subscriptionAuthState = this.mAuth.authState.subscribe(user => {   
           if(user) {
              this.mUserID = user.uid;
              this.getSellerContactInformation(this.mUserID);
              this.getSellerPropertyDetails(this.mUserID);
           }else{
             this.mUserID = null;
           }
      });
  }

  ngOnDestroy(){
    if(this.subscriptionAuthState != null){
      this.subscriptionAuthState.unsubscribe();
    }
    if(this.subscriptionSeller != null){
      this.subscriptionSeller.unsubscribe();
    }
    if(this.subscriptionSellerPropertyDetails != null){
      this.subscriptionSellerPropertyDetails.unsubscribe();
    }
  }

  getSellerContactInformation(userUID:string){

    if(this.subscriptionSeller != null){
      this.subscriptionSeller.unsubscribe();
    }

    this.subscriptionSeller = this.mFirestoreService.getSellerContactInformation(userUID).subscribe(seller => {
      this.mSeller = seller;
    });
  }

  getSellerPropertyDetails(userUID:string){
    if(this.subscriptionSellerPropertyDetails != null){
      this.subscriptionSellerPropertyDetails.unsubscribe();
    }
    
    this.subscriptionSellerPropertyDetails = this.mFirestoreService.getSellerPropertyDetails(userUID).subscribe(property => {
      this.mSellerPropertyDetails = property;
    });
  }

  onClickListedProperty(){
    this.mRouter.navigate(['./expanded-property']);
  }
}
