import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { MapsAPILoader } from '@agm/core';
import { HomeService } from '../../services/home.service';
import { IHome } from '../../model/IHome';

@Component({
  selector: 'app-verify-info-page',
  templateUrl: './verify-info-page.component.html',
  styleUrls: ['./verify-info-page.component.css']
})
export class VerifyInfoPageComponent implements OnInit {
  
  loggedIn:boolean = false;

  home:IHome;

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

  constructor(private _homeService: HomeService, private authService: FirebaseService, private router: Router) { }

  ngOnInit() {

      this.authService.isAuthenticated()
        .subscribe(
            success => this.isLoggedFunction(success)
          );
        
      this._homeService.currentHome.subscribe(home => this.initHome(home));
  }

  initHome(home:IHome){
    
    this.home = home; 
    console.log("Init Home: " + JSON.stringify(this.home));
    
    if(this.home.addressInfo.street !== ""){
      console.log("SEARCH FOR HOME WAS FOUND");
    }else{
      console.log("NO HOME FROM SEARCH QUERY FOUND. LOOKING FOR CACHE NOW");
      this.home = this._homeService.getLocalStorageProperty();
    }

    console.log(this.home);

    if(this.home.homeDetails.pool){
        this.displayPool = "Yes";
      } else{
        this.displayPool = "No";
      }

      if(this.home.homeDetails.hotTub){
        this.displayHotTub = "Yes";
      } else{
        this.displayHotTub = "No";
      }

      if(this.home.homeDetails.cooling){
        this.displayCooling = "Yes";
      } else{
        this.displayCooling = "No";
      }

      if(this.home.homeDetails.basement){
         this.displayBasement = "Yes";
      }else{
          this.displayBasement = "No";
      }

      this.lat = Number(this.home.addressInfo.latitude);
      this.lng = Number(this.home.addressInfo.longitude);
  }

  isLoggedFunction(test:boolean){
    
    if(test){
      this.loggedIn = true;
    }else{
      this.loggedIn = false;
    }
    console.log("Verify Info Page. Is Logged: " + this.loggedIn);
  }

  onClickNext(){
    console.log(this.home);
    this._homeService.updateHomeProperties(this.home);
    this.router.navigate(['/time-frame']);
  }
  
  onClickCreateAccount(){
    this._homeService.updateHomeProperties(this.home);
    this.router.navigate(['./create-account']);
  }

  onClickBasementNo(){
    this.displayBasement = "No";
    this.home.homeDetails.basement = false;
    this.editModeBasement = true;
  }

  onClickBasementYes(){
    this.displayBasement = "Yes";
    this.home.homeDetails.basement = true;
    this.editModeBasement = true;
  }

  onClickPoolNo(){
    this.displayPool = "No";
    this.home.homeDetails.pool = false;
    this.editModePool = true;
  }

  onClickPoolYes(){
    this.displayPool = "Yes";
    this.home.homeDetails.pool = true;
    this.editModePool = true;
  }

  onClickHotTubNo(){
    this.displayHotTub = "No";
    this.home.homeDetails.hotTub = false;
    this.editModeHotTub = true;
  }

  onClickHotTubYes(){
    this.displayHotTub = "Yes";
    this.home.homeDetails.hotTub = true;
    this.editModeHotTub = true;
  }

  onClickCoolingNo(){
    this.displayCooling = "No";
    this.home.homeDetails.cooling = -1;
    this.editModeCooling = false;
  }

  onClickCoolingYes(){
    this.displayCooling = "Yes";
    this.home.homeDetails.cooling = 1;
    this.editModeCooling = false;
  }

  onClickDropdownOptionOne(){
    this.home.homeDetails.roofAge = 0;
     $('#dropdownMenuButton').html('1-3 Years');
  }

  onClickDropdownOptionTwo(){
    this.home.homeDetails.roofAge = 1;
    $('#dropdownMenuButton').html('4-6 Years');
  }

  onClickDropdownOptionThree(){
    this.home.homeDetails.roofAge = 2;
    $('#dropdownMenuButton').html('7-10 Years');
  }

  onClickDropdownOptionFour(){
    this.home.homeDetails.roofAge = 3;
    $('#dropdownMenuButton').html('11-15 Years');
  }

  onClickDropdownOptionFive(){
    this.home.homeDetails.roofAge = 4;
    $('#dropdownMenuButton').html('16+ Years');
  }

  /*--------------Bedroom Functions--------------------------*/

  bedroomDisplayNumber:number;

  onClickDropdownOptionBedroomOne(){
    this.home.homeDetails.numBeds = 1;
  }

  onClickDropdownOptionBedroomTwo(){
    this.home.homeDetails.numBeds = 2;
  }

  onClickDropdownOptionBedroomThree(){
    this.home.homeDetails.numBeds = 3;
  }

  onClickDropdownOptionBedroomFour(){
    this.home.homeDetails.numBeds = 4;
  }

  onClickDropdownOptionBedroomFive(){
    this.home.homeDetails.numBeds = 5;
  }

  onClickDropdownOptionBedroomSix(){
    this.home.homeDetails.numBeds = 6;
  }

  onClickDropdownOptionBedroomSeven(){
    this.home.homeDetails.numBeds = 7;
  }

  onClickDropdownOptionBedroomEight(){
    this.home.homeDetails.numBeds = 8;
  }

  onClickDropdownOptionBedroomNine(){
    this.home.homeDetails.numBeds = 9;
  }

  onClickDropdownOptionBedroomTen(){
    this.home.homeDetails.numBeds = 10;
  }

  onClickDropdownOptionBedroomOther(){
    this.home.homeDetails.numBeds = -2;
    $('#dropdownMenuButtonBedroom').html('Other');
  }
/*----------------  Bathrooms  ---------------*/
  onClickDropdownOptionBathroomMakeSelection(){
    this.home.homeDetails.numBaths = -1;
     $('#dropdownMenuButtonBathroom').html('Make Selection');
     this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomOne(){
    this.home.homeDetails.numBaths = 1;
     $('#dropdownMenuButtonBathroom').html('1');
     this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomOneHalf(){
    this.home.homeDetails.numBaths = 1.5;
     $('#dropdownMenuButtonBathroom').html('1.5');
     this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomOne3Quarters(){
    this.home.homeDetails.numBaths = 1.75;
     $('#dropdownMenuButtonBathroom').html('1.75');
     this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomTwo(){
    this.home.homeDetails.numBaths = 2;
    $('#dropdownMenuButtonBathroom').html('2');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomTwoHalf(){
    this.home.homeDetails.numBaths = 2.5;
    $('#dropdownMenuButtonBathroom').html('2.5');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomTwo3Quarters(){
    this.home.homeDetails.numBaths = 2.75;
    $('#dropdownMenuButtonBathroom').html('2.75');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomThree(){
    this.home.homeDetails.numBaths = 3;
    $('#dropdownMenuButtonBathroom').html('3');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomThreeHalf(){
    this.home.homeDetails.numBaths = 3.5;
    $('#dropdownMenuButtonBathroom').html('3.5');
    this.bathroomsOther = false;
  }
  onClickDropdownOptionBathroomThree3Quarters(){
    this.home.homeDetails.numBaths = 3.75;
    $('#dropdownMenuButtonBathroom').html('3.75');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomFour(){
    this.home.homeDetails.numBaths = 4;
    $('#dropdownMenuButtonBathroom').html('4');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomFourHalf(){
    this.home.homeDetails.numBaths = 4.5;
    $('#dropdownMenuButtonBathroom').html('4.5');
    this.bathroomsOther = false;
  }
  onClickDropdownOptionBathroomFour3Quarters(){
    this.home.homeDetails.numBaths = 4.75;
    $('#dropdownMenuButtonBathroom').html('4.75');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomFive(){
    this.home.homeDetails.numBaths = 5;
    $('#dropdownMenuButtonBathroom').html('5');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomFiveHalf(){
    this.home.homeDetails.numBaths = 5.5;
    $('#dropdownMenuButtonBathroom').html('5.5');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroomFive3Quarters(){
    this.home.homeDetails.numBaths = 5.75;
    $('#dropdownMenuButtonBathroom').html('5.75');
    this.bathroomsOther = false;
  }

  onClickDropdownOptionBathroom6OrMore(){
    this.home.homeDetails.numBaths = -2;
    $('#dropdownMenuButtonBathroom').html('Other');
    this.bathroomsOther = true;
  }

/*------------------ End Bathrooms ------------*/
onClickDropdownOptionGarageMakeSelection(){
  this.home.homeDetails.carGarage = -1;
  $('#dropdownMenuButtonGarage').html('Make Selection');
}

onClickDropdownOptionGarageOneSpot(){
    this.home.homeDetails.carGarage = 1;
    $('#dropdownMenuButtonGarage').html('1');
    this.garageOther = false;
}

onClickDropdownOptionGarageTwoSpots(){
    this.home.homeDetails.carGarage = 2;
    $('#dropdownMenuButtonGarage').html('2');
    this.garageOther = false;
}

onClickDropdownOptionGarageThreeSpots(){
    this.home.homeDetails.carGarage = 3;
    $('#dropdownMenuButtonGarage').html('3');
    this.garageOther = false;
}

onClickDropdownOptionGarageFourSpots(){
     this.home.homeDetails.carGarage = 4;
     $('#dropdownMenuButtonGarage').html('4');
     this.garageOther = false;
}

onClickDropdownOptionGarageMoreThanFour(){
  this.home.homeDetails.carGarage = 5;
  $('#dropdownMenuButtonGarage').html('Other');
  this.garageOther = true;
}

/*---------------- Cooling Functions--------------------------*/
 onClickCoolingDropdownOptionOne(){
    this.home.homeDetails.roofAge = 0;
     $('#dropdownMenuButtonCooling').html('Central HVAC');
  }

  onClickCoolingDropdownOptionTwo(){
    this.home.homeDetails.roofAge = 1;
    $('#dropdownMenuButtonCooling').html('Furnace & Swamp Cooler');
  }

  onClickCoolingDropdownOptionThree(){
    this.home.homeDetails.roofAge = 2;
    $('#dropdownMenuButtonCooling').html('Swamp Cooler Only');
  }

  onClickCoolingDropdownOptionFour(){
    this.home.homeDetails.roofAge = 2;
    $('#dropdownMenuButtonCooling').html('Window Unit(s)');
  }

  onClickCoolingDropdownOptionFive(){
    this.home.homeDetails.roofAge = 2;
    $('#dropdownMenuButtonCooling').html('Furnace Only');
  }

  onClickCoolingDropdownOptionSix(){
    this.home.homeDetails.roofAge = 2;
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
