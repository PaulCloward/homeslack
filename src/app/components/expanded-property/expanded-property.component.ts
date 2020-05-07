import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Seller } from '../../class/Seller';
import { PropertyDetails } from '../../class/PropertyDetails';
import { FirestoreService } from '../../services/firestore.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-expanded-property',
  templateUrl: './expanded-property.component.html',
  styleUrls: ['./expanded-property.component.scss']
})
export class ExpandedPropertyComponent implements OnInit, OnDestroy {

  home:any;
  mSeller:Seller;
  userUID:string;
  
  mSellerPropertyDetails:PropertyDetails;

  mSubscriptionAuthState:Subscription;
  mSubscriptionHomeImages:Subscription;

  mImageList: any[] = [];

  constructor(private mFirestoreService: FirestoreService, private mRouter:Router, private mAuth:AngularFireAuth, private mImageService:ImageService) {  
  }

  ngOnInit() {
  	if(this.mSubscriptionAuthState){
      this.mSubscriptionAuthState.unsubscribe();
    }
    
    this.mSubscriptionAuthState = this.mAuth.authState.subscribe(user => {
      if(user){
        this.userUID = user.uid;
        this.getSellerContactInformation(this.userUID);
        this.getSellerPropertyDetails(this.userUID);

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
      if(contactInformation){
        this.mSeller = contactInformation;
      }
    });
  }
  
  getSellerPropertyDetails(userUID:string){
    this.mFirestoreService.getSellerPropertyDetails(userUID).subscribe(property => {
     if(property){
       console.log("YOO" + JSON.stringify(property));
      this.mSellerPropertyDetails = property;
     }
    });
  }
}
