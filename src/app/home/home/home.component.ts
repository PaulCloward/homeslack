import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { } from 'googlemaps';
import { SellerPropertyService } from '../../services/seller-property.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { PropertySearchEstatedService } from '../../services/property-search-estated.service';
import { PropertyDetails } from '../../class/PropertyDetails';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
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
                  private mapsAPILoader: MapsAPILoader, private mPropertyFinderService:PropertySearchEstatedService) {


  }

  onKeyDown(event: any) {

    let inputChar = event.key;

    if (inputChar == 'Enter') {
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

    this.mSellerProperty =  new PropertyDetails();

    this.searchControl = new FormControl();
    this.setCurrentPosition();


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

   

      onPropertyQueryEstated(address1:string, state:string, city:string, postalCode:string){
  
        this.mPropertyFinderService.getPropertyInformation(address1, state, city, postalCode)
          .subscribe((resPropertyDetails) => {
            this.collectAddressDetailsEstated(this.collectedPropertyDetails = JSON.parse(JSON.stringify(resPropertyDetails)));},
            error => { this.onErrorQuery(error) });
      }

    onErrorQuery(error){
        console.log(error);
        this.mRouter.navigate(['fill-in-property-info-page']);
    }

    //Not in use
    collectFoundApiPropertyDetailsAttom(data){

      if(data == null){
        console.log('data is null in  collectFound');
        return;
      }


      this.collectAddressDetailsAttom(data);
      this.initializePropertyDetailsAttom(data);

      this.mSellerPropertyService.updateSellerPropertyDetailsSource(this.mSellerProperty);
      this.mRouter.navigate(['./verify-info-page']);
    }


    collectAddressDetailsEstated(data){
      console.log(data.data);

      if(data == null || data.data == null){
        return;
      }

      let addressObject = data.data.address;

      if(addressObject != null){
        this.mSellerProperty.address.city = addressObject.city;
        this.mSellerProperty.address.state = addressObject.state;
        this.mSellerProperty.address.zip_code = addressObject.zip_code;
        this.mSellerProperty.address.street = addressObject.formatted_street_address;
        this.mSellerProperty.address.unit = addressObject.unit_number;
        
      }

      let parcelObject = data.data.parcel;

      if(parcelObject != null){
        this.mSellerProperty.lot_size = parcelObject.area_sq_ft;
      }

      let structureObject = data.data.structure;
      
      if(structureObject != null){
        this.mSellerProperty.year = structureObject.year_built;
        this.mSellerProperty.baths = structureObject.baths;
        this.mSellerProperty.beds = structureObject.beds_count;
        this.mSellerProperty.hot_tub = false;
      
        if(structureObject.pool_type != null){
          this.mSellerProperty.pool = true;
          //this.mSellerProperty.pool_description = structureObject.pool_type;
        }else{
          this.mSellerProperty.pool = false;
        }

        if(structureObject.basement_type != null){
          this.mSellerProperty.basement = true;
        }else{
          this.mSellerProperty.basement = false;
        }

        this.mSellerProperty.living_square_feet = structureObject.total_area_sq_ft;
        this.mSellerProperty.cooling = structureObject.air_conditioning_type;
        this.mSellerProperty.garage = structureObject.parking_spaces_count;
      }

      this.mSellerPropertyService.updateSellerPropertyDetailsSource(this.mSellerProperty);
      this.mRouter.navigate(['./verify-info-page']);
    }

    collectAddressDetailsAttom(data){
      
      console.log(data);

      if(data.property[0].address.locality != null && data.property[0].address.locality != 'NONE'){
        this.mSellerProperty.address.city = data.property[0].address.locality;
      }

      if(data.property[0].address.countrySubd != null && data.property[0].address.countrySubd != 'NONE'){
        this.mSellerProperty.address.state =  data.property[0].address.countrySubd;
      }

      if(data.property[0].address.line1 != null && data.property[0].address.line1 != 'NONE'){
        this.mSellerProperty.address.street = data.property[0].address.line1;
      }

      if(data.property[0].address.postal1 != null && data.property[0].address.postal1 != 'NONE'){
        this.mSellerProperty.address.zip_code = data.property[0].address.postal1;
      }
    }

    initializePropertyDetailsAttom(data){

      if(data.property[0].building.interior.bsmtsize != null){
        this.mSellerProperty.basement = data.property[0].building.interior.bsmtsize;
      }


       if(data.property[0].building.size.livingsize != null && data.property[0].building.size.livingsize != 'NONE'){
        this.mSellerProperty.living_square_feet =  data.property[0].building.size.livingsize;
      }


       if(data.property[0].building.rooms.bathstotal != null){
        // this.homeDetails.numBaths = data.property[0].building.rooms.bathstotal;
        this.mSellerProperty.baths = data.property[0].building.rooms.bathstotal;
      }

       if(data.property[0].building.rooms.beds != null){
        // this.homeDetails.numBeds = data.property[0].building.rooms.beds;
        this.mSellerProperty.beds = data.property[0].building.rooms.beds;
      }

       if(data.property[0].building.summary.yearbuilteffective != null){
        // this.homeDetails.yearBuild = data.prperty[0].building.summary.yearbuilteffective;
        this.mSellerProperty.year = data.property[0].building.summary.yearbuilteffective;
      }


       if(data.property[0].lot.pooltype != null && data.property[0].lot.pooltype != 'NONE'){
        this.mSellerProperty.pool = data.property[0].lot.pooltype;
      }

      if(data.property[0].lot.hotTubType != null && data.property[0].lot.hotTubType != 'NONE'){
        this.mSellerProperty.hot_tub = data.property[0].lot.hotTubType;
      }


      if(data.property[0].utilities.coolingtype != null && data.property[0].utilities.coolingtype != 'NONE'){
        this.mSellerProperty.cooling = data.property[0].utilities.coolingtype;
      }

      if(data.property[0].building.parking.prkgSize != null){
        this.mSellerProperty.garage = Math.trunc(data.property[0].building.parking.prkgSize / 200);
      }

      if(data.property[0].lot.lotsize1 != null){
        this.mSellerProperty.lot_size = data.property[0].lot.lotsize1;
        this.mSellerProperty.lot_size_unit = "acres";
      }

      if(data.property[0].lot.lotsize2 != null){
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
        			var temp = address[i] + "%20";
        	}
      		strAddress += temp;
    	}
    	return strAddress;
    }

    onClickSearchArrow(){

          var place = this.autocomplete.getPlace();
          console.log("Place: " + place);

          if(place == null || place.address_components == null){
            this.mRouter.navigateByUrl('fill-in-property-info-page');
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
            console.log('geometry not defined');
            return;
          }

          this.mSellerProperty.latitude = place.geometry.location.lat();
          this.mSellerProperty.longitude = place.geometry.location.lng();
          this.zoom = 18;
          var newAddressArray = this.streetName.split(" ");
          newAddressArray.unshift(this.streetNumber);
          let addressLineOne:string = this.concatWordArray(newAddressArray);
          this.onPropertyQueryEstated(addressLineOne, this.state, this.city, this.postalCode);

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
