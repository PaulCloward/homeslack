import { Component, OnInit, Input, ElementRef, NgZone, ViewChild, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { HomeService } from '../../services/home.service';
import { IHome } from '../../model/IHome';
import { IAddress } from '../../model/IAddress';
import { IHomeDetails } from '../../model/IHomeDetails';
import { ITimeframe } from '../../model/ITimeframe';
import { AngularFireAuth } from '@angular/fire/auth';
import { PropertyFinderService } from '../../services/property-finder.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  address:string;
  isLoggedIn:boolean = false;
  addressObject:any;
  inputAddress1:string;
  inputAddress2:string;
  home: IHome;
  homeDetails:IHomeDetails;
  addressInfo:IAddress;
  timeframeInfo:ITimeframe;

  collectedHomeDetails:any;
  @Input() alertMessage:string;
  
  viewMoreClicked1:boolean = false;
  viewMoreClicked2:boolean = false;
  viewMoreClicked3:boolean = false;
  viewMoreClicked4:boolean = false;
  viewMoreClicked5:boolean = false;
  viewMoreClicked6:boolean = false;
  
  currentViewMoreOpen:number = -1;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  
  streetNumber:string;
  postalCode:string;
  streetName:string;
  state:string;
  city:string;
  
  autocomplete:any;
  
  @ViewChild("search", {static: true})
  public searchElementRef: ElementRef;

  backgroundColorFooter:string = "#FFFFFF";

  constructor(private mAuth:AngularFireAuth, private router: Router, private _homeService: HomeService, private firebaseService: FirebaseService,
                  private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private mPropertyFinderService:PropertyFinderService) { 

     mAuth.authState
      .subscribe(
          user => {
            if(user){
              this.isLoggedIn = true;
            }else{
              this.isLoggedIn = false;
            }
          },
          error => this.alertMessage = error.message
        );
  }

  test(){
    console.log("asdas");
  }

  onKeyDown(event: any) {
  
    let inputChar = event.key;

    if (inputChar == 'Enter') {
      // User hit enter when searching for home
      this.onClickSearchArrow();
    }
}

  ngOnInit(){

    this.initAddressInfo();
    this.initHomeDetails();
    this.initTimeframeInfo();
    
    this.searchControl = new FormControl();
    this.setCurrentPosition();

    //load Places Autocomplete
    //todo
   this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
    });
   }

   initHomeDetails(){
     this.homeDetails = {livingSquareFootage: -1, lotSizeAcres:-1, lotSizeSqFt:-1, lotSizeSelectedType:0, yearBuild:-1, numBeds:-1, numBaths: -1, carGarage:-1, basement:false,
          pool:false, cooling:-1, hotTub:false, roofAge:-1}
   }

   initAddressInfo(){
     this.addressInfo = { city: null, street: null, state:null, zipCode:null, unit: null};
   }

   initTimeframeInfo(){
     this.timeframeInfo = { homeDescription:"", listWithRealtor:false, understandRealtorFeeObligation:false,
    preferredClosingDate:"",
    beOutByClosing:false,
    preferredMoveOutDate:"",  
    canNotBeOutByClosingExplanation:false,
    selectRightOfferDate:"",
    propertyManagerInPlace:false,
    agreementWithManagerExpire:"", 
    propertyManagementAgreementKey:"", 
    rentalAgreementExpiration:"", 
    rentalAgreementKey:"", 
    tenantMonthlyPayment:-1, 
    securityDepositExist:false, 
    securityDepositAmount:-1 }
   }

   
   private setCurrentPosition() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 18;
        });
      }
    }
   
    onPropertyQuery(address1, address2){	
        this.mPropertyFinderService.getHomeProperties(address1, address2)
      		.subscribe(resPropertyDetails => this.collectedHomeDetails = JSON.parse(JSON.stringify(resPropertyDetails)),
      			error => this.router.navigate(['./fill-in-property-info-page']),
      			() => this.collectHomeInformation(this.collectedHomeDetails));
      }

    collectHomeInformation(data){
     
      this.collectAddressInfo(data);
      this.collectHomeDetails(data);
     
      this.home = {
        id:"",
        addressInfo:this.addressInfo,
        homeDetails:this.homeDetails,
        timeframeInfo:this.timeframeInfo
      }

      this._homeService.updateHomeProperties(this.home);
      this.router.navigate(['./verify-info-page']);
    }

    collectAddressInfo(data){

      //get city
      if(data.property[0].address.locality != null && data.property[0].address.locality != 'NONE'){
        this.addressInfo.city = data.property[0].address.locality;
      }

      //get country
      if(data.property[0].address.country != null && data.property[0].address.country != 'NONE'){
        this.addressInfo.country = data.property[0].address.country;
      } 

      //get geoid
      if(data.property[0].location.geoid != null && data.property[0].location.geoid != 'NONE'){
        this.addressInfo.geoid = data.property[0].location.geoid;
      } 

      //get latitude
      if(data.property[0].location.latitude != null && data.property[0].location.latitude != 'NONE'){
        this.addressInfo.latitude = data.property[0].location.latitude;
      } 

      //get longitude
      if(data.property[0].location.longitude != null && data.property[0].location.longitude != 'NONE'){
        this.addressInfo.longitude = data.property[0].location.longitude;
      } 

      //get state
      if(data.property[0].address.countrySubd != null && data.property[0].address.countrySubd != 'NONE'){
        this.addressInfo.state = data.property[0].address.countrySubd;
      } 

      //get street
      if(data.property[0].address.line1 != null && data.property[0].address.line1 != 'NONE'){
        this.addressInfo.street = data.property[0].address.line1;
      }

      //get zip code
      if(data.property[0].address.postal1 != null && data.property[0].address.postal1 != 'NONE'){
        this.addressInfo.zipCode = data.property[0].address.postal1;
      }   
    }

    collectHomeDetails(data){

      //Basement
       if(data.property[0].building.interior.bsmtsize != null){
        this.homeDetails.basement = data.property[0].building.interior.bsmtsize;
      } 

      //Living Square Feet
       if(data.property[0].building.size.livingsize != null && data.property[0].building.size.livingsize != 'NONE'){
        this.homeDetails.livingSquareFootage = data.property[0].building.size.livingsize;
      } 

      //Baths
       if(data.property[0].building.rooms.bathstotal != null){
        this.homeDetails.numBaths = data.property[0].building.rooms.bathstotal;
      } 

      //Beds
       if(data.property[0].building.rooms.beds != null){
        this.homeDetails.numBeds = data.property[0].building.rooms.beds;
      } 

      //Year Built
       if(data.property[0].building.summary.yearbuilteffective != null){
        this.homeDetails.yearBuild = data.property[0].building.summary.yearbuilteffective;
      } 

      //Pool
       if(data.property[0].lot.pooltype != null && data.property[0].lot.pooltype != 'NONE'){
        this.homeDetails.pool = data.property[0].lot.pooltype;
      } 
      
      //hot tub
      if(data.property[0].lot.hotTubType != null && data.property[0].lot.hotTubType != 'NONE'){
       this.homeDetails.hotTub = data.property[0].lot.hotTubType;
      }
      
      //Cooling
      if(data.property[0].utilities.coolingtype != null && data.property[0].utilities.coolingtype != 'NONE'){
        this.homeDetails.cooling = data.property[0].utilities.coolingtype;
      }
      
      //Car Garage
      if(data.property[0].building.parking.prkgSize != null){
        this.homeDetails.carGarage = Math.trunc(data.property[0].building.parking.prkgSize / 200);
      }

      //Lot Size Acres
      if(data.property[0].lot.lotsize1 != null){
        this.homeDetails.lotSizeAcres = data.property[0].lot.lotsize1;
      }

      //Lot Size Acres
      if(data.property[0].lot.lotsize2 != null){
        this.homeDetails.lotSizeSqFt = data.property[0].lot.lotsize2;
      }
    }
        
    concatWordArray(address:string[]):string {
      
  	  var strAddress = "";
    	for(var i = 0; i < address.length; i++){
    		
      		if(i == address.length - 1){
        			var temp = address[i];
          }else {
        			var temp = address[i] + "+";
        	}
      		strAddress += temp;
    	}
    	return strAddress;
    }
    
    onClickSearchArrow(){
     
        this.ngZone.run(() => {
         
          var place = this.autocomplete.getPlace();

          if(place){

          } else{
            this.router.navigate(['./fill-in-property-info-page']);
          }         
          if(place == null || place == undefined){
            this.router.navigate(['./fill-in-property-info-page']);
          }
          
          if(!place){
             this.router.navigate(['./fill-in-property-info-page']);
          }   

          console.log(place);

          for(var i = 0; i < place.address_components.length; i++){
            
            var types = place.address_components[i].types;
            for (var typeIdx = 0; typeIdx < types.length; typeIdx++) {
                  
                  if (types[typeIdx] == 'postal_code') {
                      this.postalCode = place.address_components[i].short_name;
                      
                  }else if (types[typeIdx] == 'street_number') {
                      this.streetNumber = place.address_components[i].short_name;
                     
                  }else if (types[typeIdx] == 'route') {
                    
                      this.streetName = place.address_components[i].short_name;
                      
                  }else if (types[typeIdx] == 'administrative_area_level_1') {
                      this.state = place.address_components[i].short_name;
                     
                  }else if (types[typeIdx] == 'locality') {
                      this.city = place.address_components[i].short_name;
                      
                  }
              };
          }
        
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 18;
          
          var newAddressArray = this.streetName.split(" ");
          newAddressArray.unshift(this.streetNumber);
          let addressLineOne:string = this.concatWordArray(newAddressArray);
          
          let addressLineTwo:string = this.city + '+' + this.state + '+' + this.postalCode;
         
          this.onPropertyQuery(addressLineOne, addressLineTwo);
        });
    }
    
    //Sign User Out
    onSignOut(){
        this.firebaseService.logout();
    }
    
    //Toggle the first instruction container when its clicked.
    //Slides down to show more info, or up to hide info.
    toggleContainer1(){
      
       if(this.currentViewMoreOpen == 1){
         $("#container-1").slideUp();
         this.viewMoreClicked1 = false;
         this.currentViewMoreOpen = -1;
       } else{
         this.closeViewMore();
         this.currentViewMoreOpen = 1;
         this.openViewMore();
       }

    }
    
    //Toggle the second instruction container when its clicked. 
    //Slides down to show more info, or up to hide info.
    toggleContainer2(){
      
      if(this.currentViewMoreOpen == 2){
         $("#container-2").slideUp();
         this.viewMoreClicked2 = false;
         this.currentViewMoreOpen = -1;
       }else{
         this.closeViewMore();
         this.currentViewMoreOpen = 2;
         this.openViewMore();
       }
    }

    //Toggle the third instruction container when its clicked. 
    //Slides down to show more info, or up to hide info.
    toggleContainer3(){
      
      if(this.currentViewMoreOpen == 3){
         $("#container-3").slideUp();
         this.viewMoreClicked3 = false;
         this.currentViewMoreOpen = -1;
       }else{
         this.closeViewMore();
         this.currentViewMoreOpen = 3;
         this.openViewMore();
       }
    }

    //Toggle the fourth instruction container when its clicked. 
    //Slides down to show more info, or up to hide info.
    toggleContainer4(){
     
      if(this.currentViewMoreOpen == 4){
         $("#container-4").slideUp();
         this.viewMoreClicked4 = false;
         this.currentViewMoreOpen = -1;
       }else{
         this.closeViewMore();
         this.currentViewMoreOpen = 4;
         this.openViewMore();
       }
    }

    //Toggle the fifth instruction container when its clicked
    //Slides down to show more info, or up to hide info.
    toggleContainer5(){
     
      if(this.currentViewMoreOpen == 5){
         $("#container-5").slideUp();
         this.viewMoreClicked5 = false;
         this.currentViewMoreOpen = -1;
       }else{
         this.closeViewMore();
         this.currentViewMoreOpen = 5;
         this.openViewMore();
       }
    }

    //Toggle the sixth instruction container when its clicked. 
    //Slides down to show more info, or up to hide info.
    toggleContainer6(){

      if(this.currentViewMoreOpen == 6){
         $("#container-6").slideUp();
         this.viewMoreClicked6 = false;
         this.currentViewMoreOpen = -1;
       } else{
         this.closeViewMore();
         this.currentViewMoreOpen = 6;
         this.openViewMore();
       }
    }

    closeViewMore(){
       if(this.currentViewMoreOpen == 1){
          $("#container-1").slideUp();
          this.viewMoreClicked1 = false;
       } else if(this.currentViewMoreOpen == 2){
          $("#container-2").slideUp();
          this.viewMoreClicked2 = false;
       } else if(this.currentViewMoreOpen == 3){
          $("#container-3").slideUp();
          this.viewMoreClicked3 = false;
       } else if(this.currentViewMoreOpen == 4){
          $("#container-4").slideUp();
          this.viewMoreClicked4 = false;
       } else if(this.currentViewMoreOpen == 5){
          $("#container-5").slideUp();
          this.viewMoreClicked5 = false;
       } else if(this.currentViewMoreOpen == 6){
          $("#container-6").slideUp();
          this.viewMoreClicked6 = false;
       } 
    }

    openViewMore(){
       if(this.currentViewMoreOpen == 1){
          $("#container-1").slideDown();
          this.viewMoreClicked1 = true;
       } else if(this.currentViewMoreOpen == 2){
          $("#container-2").slideDown();
          this.viewMoreClicked2 = true;
       } else if(this.currentViewMoreOpen == 3){
          $("#container-3").slideDown();
          this.viewMoreClicked3 = true;
       } else if(this.currentViewMoreOpen == 4){
          $("#container-4").slideDown();
          this.viewMoreClicked4 = true;
       } else if(this.currentViewMoreOpen == 5){
          $("#container-5").slideDown();
          this.viewMoreClicked5 = true;
       } else if(this.currentViewMoreOpen == 6){
          $("#container-6").slideDown();
          this.viewMoreClicked6 = true;
       } 
    }
    
  recieveOfferInstructions:IReceiveOfferInstructions[] = [
    {title: "Verify your information", instruction: "After we pull your address, verify the information is correct"},
    {title: "Select a time-frame", instruction: "Tell us when you need the money<br>Tell us when you will be out of your home"},
    {title: "Upload pictures", instruction: "Use our friendly and interactive interface to send us pictures of your home"},
    {title: "Allow our qualified investors to make offers", instruction: "All offers will come from cash-registered investors"},
    {title: "Select offer", instruction: "Review the Top 5 offers along with each company's ratings, and choose which offer you'd like to select"},
    {title: "Close", instruction: "Close the transaction through the title company<br>Collect your money<br>Move out"}
    ];

    
}

interface IReceiveOfferInstructions {
  title:string;
  instruction:string;
}