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
  
  editModeTotalLivingArea: boolean = false;
  editModeYearBuild: boolean = false;
  editModeLotSize: boolean = false;
  editModeBedrooms: boolean = false;
  editModeBathrooms: boolean = false;
  editModeBasement: boolean = false;
  editModeGarage: boolean = false;
  editModePool: boolean = false;
  editModeHotTub: boolean = false;
  editModeCooling: boolean = false;

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
      //   let address:IAddress = {street: '9528 Foxwood Lane', city: 'Sandy', zip_code: 84092, state: "Utah", unit: null};

      // let property:PropertyDetails = {
      //   living_square_feet: 1200, lot_size:340,
      //   lot_size_unit:'acres',
      //   year:1983,
      //   beds:5,
      //   baths: 4,
      //   garage:4,
      //   basement:true,
      //   basement_completed:.50,
      //   pool:false,
      //   pool_description:"great looking place",
      //   cooling_type:"None",
      //   hot_tub:true,
      //   hot_tub_description:"fantastic",
      //   roof_age_range:"16+ years",
      //   concerns_hvac_roofing_etc:"none really",
      //   concerns_other: "no other concerns", 
      //   address:address};

        //this.initHome(property);
  }

  initHome(property:PropertyDetails){
    
    this.sellerProperty = property; 
    console.log("Init Home: " + JSON.stringify(this.sellerProperty));
    
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
        this.displayPool = "Yes";
      } else{
        this.displayPool = "No";
      }

      if(this.sellerProperty.hot_tub){
        this.displayHotTub = "Yes";
      } else{
        this.displayHotTub = "No";
      }

      if(this.sellerProperty.cooling_type){
        this.displayCooling = "Yes";
      } else{
        this.displayCooling = "No";
      }

      if(this.sellerProperty.basement){
         this.displayBasement = "Yes";
      }else{
          this.displayBasement = "No";
      }
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

  onClickCoolingNo(){
    this.sellerProperty.cooling_type = "No";
    this.editModeCooling = false;
  }

  onClickCoolingYes(){
    this.sellerProperty.cooling_type = "Yes"
    this.editModeCooling = false;
  }

  onClickDropdownOptionOne(){
    this.sellerProperty.roof_age_range = '1-3 Years';
     $('#dropdownMenuButton').html('1-3 Years');
  }

  onClickDropdownOptionTwo(){
    this.sellerProperty.roof_age_range = '4-6 Years';
    $('#dropdownMenuButton').html('4-6 Years');
  }

  onClickDropdownOptionThree(){
    this.sellerProperty.roof_age_range = '7-10 Years';
    $('#dropdownMenuButton').html('7-10 Years');
  }

  onClickDropdownOptionFour(){
    this.sellerProperty.roof_age_range = '11-15 Years';
    $('#dropdownMenuButton').html('11-15 Years');
  }

  onClickDropdownOptionFive(){
    this.sellerProperty.roof_age_range = '16+ Years';
    $('#dropdownMenuButton').html('16+ Years');
  }

  /*--------------Bedroom Functions--------------------------*/

  bedroomDisplayNumber:number;

  onClickDropdownOptionBedroomOne(){
    this.sellerProperty.beds = 1;
  }

  onClickDropdownOptionBedroomTwo(){
    this.sellerProperty.beds = 2;
  }

  onClickDropdownOptionBedroomThree(){
    this.sellerProperty.beds = 3;
  }

  onClickDropdownOptionBedroomFour(){
    this.sellerProperty.beds = 4;
  }

  onClickDropdownOptionBedroomFive(){
    this.sellerProperty.beds = 5;
  }

  onClickDropdownOptionBedroomSix(){
    this.sellerProperty.beds = 6;
  }

  onClickDropdownOptionBedroomSeven(){
    this.sellerProperty.beds = 7;
  }

  onClickDropdownOptionBedroomEight(){
    this.sellerProperty.beds = 8;
  }

  onClickDropdownOptionBedroomNine(){
    this.sellerProperty.beds = 9;
  }

  onClickDropdownOptionBedroomTen(){
    this.sellerProperty.beds = 10;
  }

  onClickDropdownOptionBedroomOther(){
    this.sellerProperty.beds = -2;
    $('#dropdownMenuButtonBedroom').html('Other');
  }
/*----------------  Bathrooms  ---------------*/
  onClickDropdownOptionBathroomMakeSelection(){
    this.sellerProperty.baths = null;
     $('#dropdownMenuButtonBathroom').html('Make Selection');
     this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomOne(){
    this.sellerProperty.baths = 1;
     $('#dropdownMenuButtonBathroom').html('1');
     this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomOneHalf(){
    this.sellerProperty.baths = 1.5;
     $('#dropdownMenuButtonBathroom').html('1.5');
     this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomOne3Quarters(){
    this.sellerProperty.baths = 1.75;
     $('#dropdownMenuButtonBathroom').html('1.75');
     this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomTwo(){
    this.sellerProperty.baths = 2;
    $('#dropdownMenuButtonBathroom').html('2');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomTwoHalf(){
    this.sellerProperty.baths = 2.5;
    $('#dropdownMenuButtonBathroom').html('2.5');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomTwo3Quarters(){
    this.sellerProperty.baths = 2.75;
    $('#dropdownMenuButtonBathroom').html('2.75');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomThree(){
    this.sellerProperty.baths = 3;
    $('#dropdownMenuButtonBathroom').html('3');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomThreeHalf(){
    this.sellerProperty.baths = 3.5;
    $('#dropdownMenuButtonBathroom').html('3.5');
    this.bathroomsOther = false;
  }
  onClickDropdownOptionBathroomThree3Quarters(){
    this.sellerProperty.baths = 3.75;
    $('#dropdownMenuButtonBathroom').html('3.75');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomFour(){
    this.sellerProperty.baths = 4;
    $('#dropdownMenuButtonBathroom').html('4');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomFourHalf(){
    this.sellerProperty.baths = 4.5;
    $('#dropdownMenuButtonBathroom').html('4.5');
    this.bathroomsOther = false;
  }
  onClickDropdownOptionBathroomFour3Quarters(){
    this.sellerProperty.baths = 4.75;
    $('#dropdownMenuButtonBathroom').html('4.75');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomFive(){
    this.sellerProperty.baths = 5;
    $('#dropdownMenuButtonBathroom').html('5');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomFiveHalf(){
    this.sellerProperty.baths = 5.5;
    $('#dropdownMenuButtonBathroom').html('5.5');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomFive3Quarters(){
    this.sellerProperty.baths= 5.75;
    $('#dropdownMenuButtonBathroom').html('5.75');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroom6OrMore(){
    this.sellerProperty.baths = 6;
    $('#dropdownMenuButtonBathroom').html('Other');
    this.bathroomsOther = true;
  }

/*------------------ End Bathrooms ------------*/
onClickDropdownOptionGarageMakeSelection(){
  this.sellerProperty.garage = -1;
  $('#dropdownMenuButtonGarage').html('Make Selection');
}

onClickDropdownOptionGarageOneSpot(){
    this.sellerProperty.garage = 1;
    $('#dropdownMenuButtonGarage').html('1');
    this.garageOther = false;
}

onClickDropdownOptionGarageTwoSpots(){
    this.sellerProperty.garage= 2;
    $('#dropdownMenuButtonGarage').html('2');
    this.garageOther = false;
}

onClickDropdownOptionGarageThreeSpots(){
    this.sellerProperty.garage = 3;
    $('#dropdownMenuButtonGarage').html('3');
    this.garageOther = false;
}

onClickDropdownOptionGarageFourSpots(){
     this.sellerProperty.garage = 4;
     $('#dropdownMenuButtonGarage').html('4');
     this.garageOther = false;
}

onClickDropdownOptionGarageMoreThanFour(){
  this.sellerProperty.garage = 5;
  $('#dropdownMenuButtonGarage').html('Other');
  this.garageOther = true;
}

/*---------------- Cooling Functions--------------------------*/
 onClickCoolingDropdownOptionOne(){
    this.sellerProperty.cooling_type = "Central HVAC";
     $('#dropdownMenuButtonCooling').html('Central HVAC');
  }

  onClickCoolingDropdownOptionTwo(){
    this.sellerProperty.cooling_type = "Furnace & Swamp Cooler";
    $('#dropdownMenuButtonCooling').html('Furnace & Swamp Cooler');
  }

  onClickCoolingDropdownOptionThree(){
    this.sellerProperty.cooling_type = "Swamp Cooler Only";
    $('#dropdownMenuButtonCooling').html('Swamp Cooler Only');
  }

  onClickCoolingDropdownOptionFour(){
    this.sellerProperty.cooling_type = "Window Unit(s)";
    $('#dropdownMenuButtonCooling').html('Window Unit(s)');
  }

  onClickCoolingDropdownOptionFive(){
    this.sellerProperty.cooling_type = "Furnace Only";
    $('#dropdownMenuButtonCooling').html('Furnace Only');
  }

  onClickCoolingDropdownOptionSix(){
    this.sellerProperty.cooling_type = "None";
    $('#dropdownMenuButtonCooling').html('None');
  }

/*--------------------------------------------------------------*/
onClickBasementMakeSelection(){
  this.basementPercentageFinished = "Percentage Finished?";
}

onClickBasement10(){
  this.basementPercentageFinished = "10%";
}

onClickBasement25(){
   this.basementPercentageFinished = "25%";
}

onClickBasement50(){
   this.basementPercentageFinished = "50%";
}

onClickBasement75(){
   this.basementPercentageFinished = "75%";
}

onClickBasement90(){
   this.basementPercentageFinished = "90%";
}

onClickBasement100(){
   this.basementPercentageFinished = "100%";
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
