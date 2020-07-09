import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
import { PropertyViewService } from '../services/property-view.service';
import { AuthenticationService } from '../../services/authentication.service';
import { PropertyDetails } from '../../class/PropertyDetails';

@Component({
  selector: 'app-market-listings',
  templateUrl: './market-listings.component.html',
  styleUrls: ['./market-listings.component.scss']
})
export class MarketListingsComponent implements OnInit {

  inputAddress:string = '';

  filterBedCount: Number;
  filterBathCount: Number;
  filterPropertyType:Number;
  sliderLotSize:Number;
  sliderLivingArea:Number;

  filterBathCountOne:boolean = false;
  filterBathCountTwo:boolean = false;
  filterBathCountThree:boolean = false;
  filterBathCountFour:boolean = false;
  currentBathCount:number = -1;
  bathCountArray:boolean[] = [];

  minSize:string = '';
  maxSize:string = '';

  mListings:any;
  mWatchList:PropertyDetails[];

  mWatchAddresses:string[] = [];

  
  constructor(private mAuthService:AuthenticationService, private mFirestoreService:FirestoreService, private mRouter: Router, private mPropertyViewService:PropertyViewService) { }

  ngOnInit() {


    this.bathCountArray.push(this.filterBathCountOne);
    this.bathCountArray.push(this.filterBathCountTwo);
    this.bathCountArray.push(this.filterBathCountThree);
    this.bathCountArray.push(this.filterBathCountFour);

    this.onReset();
    this.getPropertyListings();

    this.mAuthService.getUser().then(user => {

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
    this.inputAddress = '';
    this.sliderLotSize = 0;
    this.sliderLivingArea = 0;
    this.filterBedCount = 0;
    this.filterBathCount = 0;
    this.filterPropertyType = 0;
    this.minSize = '';
    this.maxSize = '';
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

  updateBathFilter(bathCount:number){
   
    if(this.currentBathCount == -1){
      this.bathCountArray[bathCount - 1] = true;
      this.currentBathCount = bathCount;
    }else if(this.currentBathCount == bathCount){
      this.resetSpecificFilter(this.bathCountArray);
      this.currentBathCount = -1;
    }else{
      
      this.resetSpecificFilter(this.bathCountArray);
      this.bathCountArray[bathCount - 1] = true;
      this.currentBathCount = bathCount;
    }

    console.log("The current bath selection: " + this.currentBathCount);
  }

  resetSpecificFilter(filterArray:boolean[]){
    for(let i = 0; i < this.bathCountArray.length; i++){
      this.bathCountArray[i] = false;
    }

    for(let i = 0; i < this.bathCountArray.length; i++){
      console.log(i + ": " + this.bathCountArray[i]);
    }
  }

  onSearch(){
    //might not need
  }


}
