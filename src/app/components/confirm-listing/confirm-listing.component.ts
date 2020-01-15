import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyDetails } from '../../class/PropertyDetails';
import { FirestoreService } from '../../services/firestore.service';
import { Seller } from '../../class/Seller';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-confirm-listing',
  templateUrl: './confirm-listing.component.html',
  styleUrls: ['./confirm-listing.component.css']
})
export class ConfirmListingComponent implements OnInit {
  
  userUID:string;
  sellerContact:Seller;
  sellerPropertyDetails:PropertyDetails;

  constructor(private mFirestoreService: FirestoreService, private mRouter:Router, private mAuth:AngularFireAuth) {}

  ngOnInit() {
   
    
    this.mAuth.authState.subscribe(user => {
      if(user){
        this.userUID = user.uid;
        this.getSellerContactInformation(this.userUID);
        this.getSellerPropertyDetails(this.userUID);
      }
    })
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
