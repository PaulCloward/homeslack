import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISeller } from '../../model/ISeller';
import { Router } from '@angular/router';
import { IHome } from '../../model/IHome';
import { Seller } from '../../class/Seller';
import { PropertyDetails } from '../../class/PropertyDetails';
import { FirestoreService } from '../../services/firestore.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-expanded-property',
  templateUrl: './expanded-property.component.html',
  styleUrls: ['./expanded-property.component.css']
})
export class ExpandedPropertyComponent implements OnInit, OnDestroy {

  home:any;
  mSeller:Seller;
  userUID:string;
  

  mSellerPropertyDetails:PropertyDetails;

  mSubscriptionAuthState:Subscription;

  constructor(private mFirestoreService: FirestoreService, private mRouter:Router, private mAuth:AngularFireAuth) {  
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
