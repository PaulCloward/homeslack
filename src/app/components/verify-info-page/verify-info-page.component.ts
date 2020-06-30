import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { PropertyDetails } from '../../class/PropertyDetails';
import { SellerPropertyService } from '../../services/seller-property.service';

@Component({
  selector: 'app-verify-info-page',
  templateUrl: './verify-info-page.component.html',
  styleUrls: ['./verify-info-page.component.scss']
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
  editModeBasementCompletion: boolean;
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

    if(this.sellerProperty.living_square_feet){
      this.editModeTotalLivingArea = false;
    }else{
      this.editModeTotalLivingArea = true;
    }

    if(this.sellerProperty.year){
      this.editModeYearBuild = false;
    }else{
      this.editModeYearBuild = true;
    }

    if(this.sellerProperty.lot_size){
      this.editModeLotSize = false;
    }else{
      this.editModeLotSize = true;
    }

      if(this.sellerProperty.baths){
        this.editModeBathrooms = false;
    }else{
        this.editModeBathrooms = true;
    }

      if(this.sellerProperty.beds){
         this.editModeBedrooms = false;
      }else{
          this.editModeBedrooms = true;
      }

      if(this.sellerProperty.basement){
        this.editModeBasement = false;
     }else{
         this.editModeBasement = true;
     }
    
    if(this.sellerProperty.garage){
      this.editModeGarage = false;
    }else{
      this.editModeGarage = true;
    }

    if(this.sellerProperty.pool){
        this.editModePool = false;
      } else{
        this.sellerProperty.pool = false;
        this.editModePool = true;
      }

      if(this.sellerProperty.hot_tub){
        this.editModeHotTub = false;
      } else{
        this.sellerProperty.hot_tub = false;
        this.editModeHotTub = true;
      }

      if(this.sellerProperty.cooling){
        this.editModeCooling = false;
      } else{
        this.editModeCooling = true;
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

  onClickBasement(basementExists:boolean){
    this.sellerProperty.basement = basementExists;
    this.editModeBasement = false;
  }

  onClickBasementCompletion(completion:number){
    this.sellerProperty.basement_completed = completion;
  }

  onClickPool(poolExists){
    this.sellerProperty.pool = poolExists;
    this.editModePool = false;
  }

  onClickHotTub(isHotTub:boolean){
    this.sellerProperty.hot_tub = isHotTub;
    this.editModeHotTub = false;
  }


  onClickRoofRange(range:string){
    this.sellerProperty.roof_age_range = range;
  }

  onClickBeds(bedCount:number){
    this.sellerProperty.beds = bedCount;
    this.editModeBedrooms = false;
  }


  onClickBaths(bathCount){
    this.sellerProperty.baths = bathCount;
    this.editModeBathrooms = false;
  }

onClickCooling(coolingType:string){
  this.sellerProperty.cooling = coolingType;
  this.editModeCooling = false;
}
onClickGarageSize(carFitInGarage:number){
  this.sellerProperty.garage = carFitInGarage;
  this.editModeGarage = false;
}

onClickYearBuild(year){
  this.sellerProperty.year = year;
  this.editModeYearBuild = false;
}

/*---------------------------------------------------------------*/

 mapStyle =[
  
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#0080c0"
        },
        {
          "weight": 2
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }  
]

// @HostListener('keydown', ['$event'])
// onKeyDown(e: KeyboardEvent) {
//   if (
//     // Allow: Delete, Backspace, Tab, Escape, Enter
//     [46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1 || 
//     (e.keyCode === 65 && e.ctrlKey === true) || // Allow: Ctrl+A
//     (e.keyCode === 67 && e.ctrlKey === true) || // Allow: Ctrl+C
//     (e.keyCode === 86 && e.ctrlKey === true) || // Allow: Ctrl+V
//     (e.keyCode === 88 && e.ctrlKey === true) || // Allow: Ctrl+X
//     (e.keyCode === 65 && e.metaKey === true) || // Cmd+A (Mac)
//     (e.keyCode === 67 && e.metaKey === true) || // Cmd+C (Mac)
//     (e.keyCode === 86 && e.metaKey === true) || // Cmd+V (Mac)
//     (e.keyCode === 88 && e.metaKey === true) || // Cmd+X (Mac)
//     (e.keyCode >= 35 && e.keyCode <= 39) // Home, End, Left, Right
//   ) {
//     return;  // let it happen, don't do anything
//   }
//   // Ensure that it is a number and stop the keypress
//   if (
//     (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
//     (e.keyCode < 96 || e.keyCode > 105)
//   ) {
//     e.preventDefault();
//   }
// }

// @HostListener('paste', ['$event'])
// onPaste(event: ClipboardEvent) {
//   event.preventDefault();
//   const pastedInput: string = event.clipboardData
//     .getData('text/plain')
//     .replace(/\D/g, ''); // get a digit-only string
//   document.execCommand('insertText', false, pastedInput);
// }
// @HostListener('drop', ['$event'])
// onDrop(event: DragEvent) {
//   event.preventDefault();
//   const textData = event.dataTransfer
//     .getData('text').replace(/\D/g, '');
//   //this.inputElement.focus();
//   document.execCommand('insertText', false, textData);
// }

}
