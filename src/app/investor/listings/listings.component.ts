import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
import { PropertyViewService } from '../services/property-view.service';
import { AuthenticationService } from '../../services/authentication.service';
import { PropertyDetails } from '../../class/PropertyDetails';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.scss']
})
export class ListingsComponent implements OnInit {

  filterBedCount: Number;
  filterBathCount: Number;
  filterPropertyType:Number;
  sliderLotSize:Number;
  sliderLivingArea:Number;

  mListings:any;
  mWatchList:PropertyDetails[];

  mWatchAddresses:string[] = [];

  
  constructor(private mAuthService:AuthenticationService, private mFirestoreService:FirestoreService, private mRouter: Router, private mPropertyViewService:PropertyViewService) { }

  ngOnInit() {
    this.onReset();
    this.getPropertyListings();

    this.mAuthService.getUser().then(user => {
      user = user;

      if(user){
        this.mFirestoreService.getInvestorWatchList(user.uid).subscribe(watchList => {
          console.log("watchlist: " +  watchList);
          this.mWatchList = watchList.watch_list; 
          this.mWatchAddresses = [];
          
          for(let property of this.mWatchList){
            this.mWatchAddresses.push(property.address.street);
            console.log(property.address.street)
          }
          this.mPropertyViewService.updateWatchListAddresses(this.mWatchAddresses);
        });
      }
    });
  }

  onReset(){
    this.sliderLotSize = 0;
    this.sliderLivingArea = 0;
    this.filterBedCount = 0;
    this.filterBathCount = 0;
    this.filterPropertyType = 0;
  }

  getPropertyListings(){
     this.mFirestoreService.getAllSellerPropertyDetails().subscribe(listings => {
      this.mListings = listings;
     });
  }

  onPropertyClick(property:any){
    this.mPropertyViewService.updateViewPropertyData(property);
    this.mRouter.navigateByUrl('investor/property-profile');
  }
  
  getFilterOutcome(property:PropertyDetails){
    return (this.sliderLotSize <= property.lot_size) && (this.filterBathCount <= property.baths) && (this.filterBedCount <= property.beds);
  }


}
