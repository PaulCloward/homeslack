import { Component, OnInit, Input, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { SellerPropertyService } from '../../services/seller-property.service';
import { IHome } from '../../model/IHome';
import { IAddress } from '../../model/IAddress';
import { IHomeDetails } from '../../model/IHomeDetails';
import { ITimeframe } from '../../model/ITimeframe';
import { AngularFireAuth } from '@angular/fire/auth';
import { PropertyFinderService } from '../../services/property-finder.service';
import { PropertyDetails } from '../../class/PropertyDetails';
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
 
  mSellerProperty:PropertyDetails;

  collectedPropertyDetails:any;
  @Input() alertMessage:string;
  
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

  constructor(private mAngularFireAuth:AngularFireAuth, private mRouter: Router, private mSellerPropertyService: SellerPropertyService,private mAuthService: AuthenticationService,
                  private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private mPropertyFinderService:PropertyFinderService) { 

   
  }

  onKeyDown(event: any) {
  
    let inputChar = event.key;

    if (inputChar == 'Enter') {
      // User hit enter when searching for home
      this.onClickSearchArrow();
    }
}

  ngOnInit(){

    this.mAngularFireAuth.authState.subscribe(user => {
          if(user){
            this.isLoggedIn = true;
          }else{
            this.isLoggedIn = false;
          }
        },
        error => this.alertMessage = error.message
      );

    // this.initAddressInfo();
    // this.initHomeDetails();
    // this.initTimeframeInfo();

    this.mSellerProperty =  new PropertyDetails();
    
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
      		.subscribe(resPropertyDetails => this.collectedPropertyDetails = JSON.parse(JSON.stringify(resPropertyDetails)),
      			error => this.mRouter.navigate(['./fill-in-property-info-page']),
      			() => this.collectFoundApiPropertyDetails(this.collectedPropertyDetails));
      }

    collectFoundApiPropertyDetails(data){
     
      this.collectAddressDetails(data);
      this.initializePropertyDetails(data);
      
      this.mSellerPropertyService.updateSellerPropertyDetailsSource(this.mSellerProperty);
      this.mRouter.navigate(['./verify-info-page']);
    }

    collectAddressDetails(data){
    
      //get city
      if(data.property[0].address.locality != null && data.property[0].address.locality != 'NONE'){
        //this.addressInfo.city = data.property[0].address.locality;
        this.mSellerProperty.address.city = data.property[0].address.locality;
      }

      //get state
      if(data.property[0].address.countrySubd != null && data.property[0].address.countrySubd != 'NONE'){
        //this.addressInfo.state = data.property[0].address.countrySubd;
        this.mSellerProperty.address.state =  data.property[0].address.countrySubd;
      } 

      //get street
      if(data.property[0].address.line1 != null && data.property[0].address.line1 != 'NONE'){
        // this.addressInfo.street = data.property[0].address.line1;
        this.mSellerProperty.address.street = data.property[0].address.line1;
      }

      //get zip code
      if(data.property[0].address.postal1 != null && data.property[0].address.postal1 != 'NONE'){
        // this.addressInfo.zip_code = data.property[0].address.postal1;
        this.mSellerProperty.address.zip_code = data.property[0].address.postal1;
      }   
    }

    initializePropertyDetails(data){

      //Basement
       if(data.property[0].building.interior.bsmtsize != null){
        // this.homeDetails.basement = data.property[0].building.interior.bsmtsize;
        this.mSellerProperty.basement = data.property[0].building.interior.bsmtsize;
      } 

      //Living Square Feet
       if(data.property[0].building.size.livingsize != null && data.property[0].building.size.livingsize != 'NONE'){
        // this.homeDetails.livingSquareFootage = data.property[0].building.size.livingsize;
        this.mSellerProperty.living_square_feet =  data.property[0].building.size.livingsize;
      } 

      //Baths
       if(data.property[0].building.rooms.bathstotal != null){
        // this.homeDetails.numBaths = data.property[0].building.rooms.bathstotal;
        this.mSellerProperty.baths = data.property[0].building.rooms.bathstotal;
      } 

      //Beds
       if(data.property[0].building.rooms.beds != null){
        // this.homeDetails.numBeds = data.property[0].building.rooms.beds;
        this.mSellerProperty.beds = data.property[0].building.rooms.beds;
      } 

      //Year Built
       if(data.property[0].building.summary.yearbuilteffective != null){
        // this.homeDetails.yearBuild = data.property[0].building.summary.yearbuilteffective;
        this.mSellerProperty.year = data.property[0].building.summary.yearbuilteffective;
      } 

      //Pool
       if(data.property[0].lot.pooltype != null && data.property[0].lot.pooltype != 'NONE'){
        // this.homeDetails.pool = data.property[0].lot.pooltype;
        this.mSellerProperty.pool = data.property[0].lot.pooltype;
      } 
      
      //hot tub
      if(data.property[0].lot.hotTubType != null && data.property[0].lot.hotTubType != 'NONE'){
      //  this.homeDetails.hotTub = data.property[0].lot.hotTubType;
      this.mSellerProperty.hot_tub = data.property[0].lot.hotTubType;
      }
      
      //Cooling
      if(data.property[0].utilities.coolingtype != null && data.property[0].utilities.coolingtype != 'NONE'){
        // this.homeDetails.cooling = data.property[0].utilities.coolingtype;
        this.mSellerProperty.cooling_type = data.property[0].utilities.coolingtype;
      }
      
      //Car Garage
      if(data.property[0].building.parking.prkgSize != null){
        // this.homeDetails.carGarage = Math.trunc(data.property[0].building.parking.prkgSize / 200);
        this.mSellerProperty.garage = Math.trunc(data.property[0].building.parking.prkgSize / 200);
      }

      //Lot Size Acres
      if(data.property[0].lot.lotsize1 != null){
        // this.homeDetails.lotSizeAcres = data.property[0].lot.lotsize1;
        this.mSellerProperty.lot_size = data.property[0].lot.lotsize1;
        this.mSellerProperty.lot_size_unit = "acres";
      }

      //Lot Size Acres
      if(data.property[0].lot.lotsize2 != null){
        // this.homeDetails.lotSizeSqFt = data.property[0].lot.lotsize2;
        this.mSellerProperty.lot_size = data.property[0].lot.lotsize1;
        this.mSellerProperty.lot_size_unit = "acres";
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
            this.mRouter.navigate(['./fill-in-property-info-page']);
          }         
          if(place == null || place == undefined){
            this.mRouter.navigate(['./fill-in-property-info-page']);
          }
          
          if(!place){
             this.mRouter.navigate(['./fill-in-property-info-page']);
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

          this.mSellerProperty.latitude = place.geometry.location.lat();
          this.mSellerProperty.longitude = place.geometry.location.lng();
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
        this.mAuthService.logout();
    }
    
    
    
    

    
    
  receiveOfferInstructions:IReceiveOfferInstructions[] = [
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