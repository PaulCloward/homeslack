import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { HomeService } from '../../services/home.service';
import { IHome } from '../../model/IHome';

@Component({
  selector: 'app-confirm-listing',
  templateUrl: './confirm-listing.component.html',
  styleUrls: ['./confirm-listing.component.css']
})
export class ConfirmListingComponent implements OnInit {

  home:IHome;

  displayCooling:string;
  
  //Firestore implementation array 
  homes:IHome[];

  constructor(private _homeService: HomeService, private router:Router, private firebaseService: FirebaseService) {}

  ngOnInit() {
    this._homeService.currentHome.subscribe(home => this.initHome(home));
   /* this._homeService.getHomeListings().subscribe(homes => this.homes = homes);*/

  }

  initHome(home:IHome){
    this.home = home;

    if(this.home.addressInfo.street !== ""){
      console.log("SEARCH FOR HOME WAS FOUND");
    }else{
      console.log("NO HOME FROM SEARCH QUERY FOUND. LOOKING FOR CACHE NOW");
      this.home = this._homeService.getLocalStorageProperty();
    }

    this.initCoolingDisplay();
  }

  initCoolingDisplay(){
    const coolingNum = this.home.homeDetails.cooling;
    if(coolingNum == null || coolingNum == -1){
      this.displayCooling = "None";
    }else if(coolingNum == 0){
      this.displayCooling = "Central HVAC";
    }else if(coolingNum == 1){
      this.displayCooling = "Furnace & Swamp Cooler";
    }else if(coolingNum == 2){
      this.displayCooling = "Swamp Cooler Only";
    }else if(coolingNum == 3){
      this.displayCooling = "Window Unit(s)";
    }else if(coolingNum == 4){
      this.displayCooling = "Furnace Only";
    } else {
      this.displayCooling = "None";
    }
  }

  onSubmitProperty(){
    this._homeService.updateHomeProperties(this.home);
    this.router.navigate(['./seller-account']);
  }

  /*
   * Add Home Listing to Firebase Firestore database. 
   * Then reset model object to empty attributes.
   * Route to User Portal Listing.
  */
  onSubmitHomeListing(){
    
    console.log(this.home);
    
    //this._homeService.addHomeListing(this.home);
    this.router.navigate(['./seller-account']);
  }
}
