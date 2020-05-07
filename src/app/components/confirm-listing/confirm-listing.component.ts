import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyDetails } from '../../class/PropertyDetails';
import { FirestoreService } from '../../services/firestore.service';
import { ImageService } from '../../services/image.service';
import { Seller } from '../../class/Seller';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-listing',
  templateUrl: './confirm-listing.component.html',
  styleUrls: ['./confirm-listing.component.scss']
})
export class ConfirmListingComponent implements OnInit, OnDestroy {
  
  userUID:string;
  sellerContact:Seller;
  sellerPropertyDetails:PropertyDetails;

  mSubscriptionAuthState:Subscription;
  mSubscriptionHomeImages:Subscription;

  mImageList: any[] = [];

  constructor(private mFirestoreService: FirestoreService, private mRouter:Router, private mAuth:AngularFireAuth, private mImageService:ImageService) {}

  ngOnInit() {
   
    if(this.mSubscriptionAuthState){
      this.mSubscriptionAuthState.unsubscribe();
    }
    
    this.mSubscriptionAuthState = this.mAuth.authState.subscribe(user => {
      if(user){
        this.userUID = user.uid;
        this.getSellerContactInformation(this.userUID);
        this.getSellerPropertyDetails(this.userUID);
        
        if(this.mSubscriptionHomeImages){
          this.mSubscriptionHomeImages.unsubscribe();
        }
    
        this.mSubscriptionHomeImages = this.mImageService.getImageDetailList(user.uid).subscribe((images)=> {
            if(images){
              this.mImageList = images;
            }
          }
        );
      }
    });

   
    
  }

  ngOnDestroy(){
    if(this.mSubscriptionAuthState){
      this.mSubscriptionAuthState.unsubscribe();
    }
  }

  getSellerContactInformation(userUID:string){
    this.mFirestoreService.getSellerContactInformation(userUID).subscribe(contactInformation => {
      this.sellerContact = contactInformation;
    });
  }
  
  getSellerPropertyDetails(userUID:string){
    this.mFirestoreService.getSellerPropertyDetails(userUID).subscribe(property => {
      this.sellerPropertyDetails = property;
    });
  }

  onSubmitHomeListing(){
    this.mRouter.navigate(['./seller-account']);
  }
}
