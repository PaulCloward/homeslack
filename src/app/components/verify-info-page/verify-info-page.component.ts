import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { PropertyDetails } from '../../class/PropertyDetails';
import { SellerPropertyService } from '../../services/seller-property.service';
import { IAddress } from '../../model/IAddress';

@Component({
  selector: 'app-verify-info-page',
  templateUrl: './verify-info-page.component.html',
  styleUrls: ['./verify-info-page.component.css']
})
export class VerifyInfoPageComponent implements OnInit {
  
  userUID:string;
  sellerProperty:PropertyDetails;
  otherBeds:boolean = false;
  otherGarage:boolean = false;
  otherBathCount:boolean = false;

 //OLD STUFF BELOW

  loggedIn:boolean = false;
  // TypeError: Cannot read property 'basement' of undefined
  lat: number;
  lng: number;
  zoom:number = 18;
  
  editModeTotalLivingArea: boolean;
  editModeYearBuild: boolean;
  editModeLotSize: boolean;
  editModeBedrooms: boolean;
  editModeBathrooms: boolean;
  editModeBasement: boolean;
  editModeGarage: boolean;
  editModePool: boolean;
  editModeHotTub: boolean;
  editModeCooling: boolean;

  displayPool:string;
  displayHotTub:string;
  displayCooling:string;
  displayGarage:string;
  displayBasement:string;
  
  totalLivingAreaHint:string = "Tell us what the total living area of your home is. EXAMPLE: 1500sqft";
  yearBuildHint:string = "Tell us what year your home was built. EXAMPLE: 1985"
  lotSizeHint:string = "Tell us what the total size of your lot is. This is usually in square feet or acres. EXAMPLE: 13068 sqft or .3 acres"
  bedroomsHint:string = "Tell us how many finished bedrooms are in your home. EXAMPLE: 3"
  bathroomsHint:string = "Tell us how many finished bathrooms are in your home. EXAMPLE: 2.5"
  basementHint:string = "Tell us if you have a basement. If YES, tell us how much of your basement is finished living area"
  garageHint:string = "Tell us how big of a garage you have. EXAMPLE: 2 car"
  poolHint:string = "Tell us if you have a pool. If YES, tell us what condition the pool equipment is in."
  hotTubHint:string = "Tell us if you have an in-ground hot tub. If YES, tell us what condition the hot tub equipment is in."
  coolingHint:string = "Tell us what type of cooling system you have in your home"
  
  garageOther:boolean= false;
  bathroomsOther:boolean= false;

  basementPercentageFinished:string = "Percentage Finished?";

  poolCondition:string;
  hotTubCondition:string;

  lotSizeType:string= "Sqft";

  constructor(private mAuth: AngularFireAuth, private mSellerPropertyService: SellerPropertyService, private mRouter: Router) { }

  ngOnInit() {
    
      this.mAuth.authState.subscribe(user => {
        if(user) {
           this.loggedIn = true;
          } else {
            this.loggedIn = false;
          }
        }
      );

      this.mSellerPropertyService.getSellerPropertyDetailsSource().subscribe(propertyDetails => 
      { 
          this.initHome(propertyDetails);
      });
  }

  initHome(property:PropertyDetails){
    
    this.sellerProperty = property; 
    
    if(this.sellerProperty.address.street != ""){
      console.log("SEARCH FOR HOME WAS FOUND");
    }

    if(this.sellerProperty.latitude){
      this.lat = this.sellerProperty.latitude;
    }

    if(this.sellerProperty.longitude){
      this.lng = this.sellerProperty.longitude;
    }


    if(this.sellerProperty.pool){
        this.editModePool = true;
      } else{
        this.editModePool = false;
      }

      if(this.sellerProperty.hot_tub){
        this.editModeHotTub = true;
      } else{
        this.editModeHotTub = false;
      }

      if(this.sellerProperty.cooling_type){
        this.editModeCooling = true;
      } else{
        this.editModeCooling = false;
      }

      if(this.sellerProperty.basement){
         this.displayBasement = "Yes";
      }else{
          this.displayBasement = "No";
      }
  }

  arrayRange(n: number, startFrom: number): number[] {
    return [...Array(n).keys()].map(i => startFrom - i);
  }


  onClickNext(){
    this.mSellerPropertyService.updateSellerPropertyDetailsSource(this.sellerProperty);
    this.mRouter.navigate(['/listing-time']);
  }
  
  onClickCreateAccount(){
    this.mSellerPropertyService.updateSellerPropertyDetailsSource(this.sellerProperty);
    this.mRouter.navigate(['./create-account']);
  }

  onClickBasementNo(){
    this.sellerProperty.basement = false;
    this.editModeBasement = true;
  }

  onClickBasementYes(){
    this.sellerProperty.basement = true;
    this.editModeBasement = true;
  }


  onClickPoolNo(){
    this.sellerProperty.pool = false;
    this.editModePool = true;
  }

  onClickPoolYes(){
    this.sellerProperty.pool = true;
    this.editModePool = true;
  }

  onClickHotTubNo(){
    this.sellerProperty.hot_tub = false;
    this.editModeHotTub = true;
  }

  onClickHotTubYes(){
    this.sellerProperty.hot_tub = true;
    this.editModeHotTub = true;
  }

  
  onClickHotTub(isHotTub:boolean){
    if(isHotTub){
      this.sellerProperty.hot_tub = true;
    }else{
      this.sellerProperty.hot_tub = false;
    }
  }

  onClickPool(isPool:boolean){
    if(isPool){
      this.sellerProperty.pool = true;
    }else{
      this.sellerProperty.pool = false;
    }
  }

  onClickRoofRange(range:string){
    this.sellerProperty.roof_age_range = range;
  }

  onClickBeds(bedCount:number){
    this.sellerProperty.beds = bedCount;
  }

  
  onClickBaths(bathCount){
    this.sellerProperty.baths = bathCount;
  }


onClickGarage(carGarageSize:number){
  this.sellerProperty.garage = carGarageSize;
}

onClickCooling(coolingType:string){
  this.sellerProperty.cooling_type = coolingType;
}

onClickBasementCompletion(completion:number){
  this.sellerProperty.basement_completed = completion;
}

/*---------------------------------------------------------------*/

 mapStyle =[
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#008eff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "0"
            },
            {
                "lightness": "0"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": "-60"
            },
            {
                "lightness": "-20"
            }
        ]
    }
]
}
