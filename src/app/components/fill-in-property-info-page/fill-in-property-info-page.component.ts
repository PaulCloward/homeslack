import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { FirebaseService } from '../../services/firebase.service';
import { IHome } from '../../model/IHome';
import { IAddress } from '../../model/IAddress';
import { IHomeDetails } from '../../model/IHomeDetails';
import { IConcerns } from '../../model/IConcerns';
import { ITimeframe } from '../../model/ITimeframe';

@Component({
   selector: 'app-fill-in-property-info-page',
  templateUrl: './fill-in-property-info-page.component.html',
  styleUrls: ['./fill-in-property-info-page.component.css']
})
export class FillInPropertyInfoPageComponent implements OnInit {

  basementPercentageFinished:string = "Percentage Finished?";

  loggedIn:boolean = false;

  home:IHome;

  apartmentNumber:String = "";

  lat: number;
  lng: number;
  zoom:number = 18;

  displayLivingSquareFootage:string;
  displayYearBuild:string;
  displayTotalSquareFeet:string;

  displayPool:string;
  displayHotTub:string;
  displayCooling:string;
  displayGarage:string;
  displayBasement:string;
  displayZipCode:string;

  garageSquareFeet:number;
  poolCondition:string;
  hotTubCondition:string;

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

  garageOther:boolean = false;

  homeDetails:IHomeDetails = {livingSquareFootage: null, lotSizeAcres:null, lotSizeSqFt: null, lotSizeSelectedType:0, yearBuild:null, numBeds:-1, numBaths: -1, carGarage:-1, basement:false,
          pool:false, cooling:-1, hotTub:false, roofAge:-1}
    
  addressInfo:IAddress = { city: "", street: "", state:"", zipCode:"", country: "", latitude:"", longitude: "", geoid: ""};
   
  concerns:IConcerns = { hperIssues: "", todoQuestion: "", otherConcerns: ""};
  
  timeframeInfo:ITimeframe = { homeDescription:"", listWithRealtor:false,
    understandRealtorFeeObligation:false,
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

  constructor(private _homeService: HomeService, private authService: FirebaseService, private router: Router) {
      //this._homeService.currentHome.subscribe(home => this.initHome(home));
      this.home = {
        id:"",
        addressInfo:this.addressInfo,
        homeDetails:this.homeDetails,
        concerns:this.concerns,
        timeframeInfo:this.timeframeInfo
      }

      this.initHome(this.home);
   }

  ngOnInit() {
    this.authService.isAuthenticated()
      .subscribe(
          success => this.isLoggedFunction(success)
        );
  }

  initHome(home:IHome){
    
    this.home = home; 

    if(this.home.homeDetails.livingSquareFootage == -1){
      this.displayLivingSquareFootage = "";
    }else{
      this.displayLivingSquareFootage = String(this.home.homeDetails.livingSquareFootage);
    }

    if(this.home.homeDetails.yearBuild == -1){
      this.displayYearBuild = "";
    }else{
      this.displayYearBuild = String(this.home.homeDetails.yearBuild);
    }

    console.log(this.home);

    this.initRoofDropDownText(this.home);
    this.initBedroomsDropDownText(this.home);
    this.initBathroomsDropDownText(this.home);

    if(this.home.homeDetails.carGarage){
      this.displayGarage = "Yes";
    }else{
      this.displayGarage = "No";
    }

    if(this.home.homeDetails.basement){
      this.displayBasement = "Yes";
    }else{
      this.displayBasement = "No";
    }

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

      this.lat = Number(this.home.addressInfo.latitude);
      this.lng = Number(this.home.addressInfo.longitude);
  }

  isLoggedFunction(test:boolean){
    
    if(test){
      this.loggedIn = true;
    }else{
      this.loggedIn = false;
    }
    console.log("Fill In Property Info Page. Is Logged: " + this.loggedIn);
  }

  onClickNext(){
    this._homeService.updateHomeProperties(this.home);
    this.router.navigate(['/time-frame']);
  }

  onClickCreateAccount(){
    this._homeService.updateHomeProperties(this.home);
    this.router.navigate(['./create-account']);
  }

  onClickPoolNo(){
    this.displayPool = "No";
    this.home.homeDetails.pool = false;
  }

  onClickPoolYes(){
    this.displayPool = "Yes";
    this.home.homeDetails.pool = true;
  }

  onClickHotTubNo(){
    this.displayHotTub = "No";
    this.home.homeDetails.hotTub = false;
  }

  onClickHotTubYes(){
    this.displayHotTub = "Yes";
    this.home.homeDetails.hotTub = true;
  }

  onClickCoolingNo(){
    this.displayCooling = "No";
    this.home.homeDetails.cooling = -2;
  }

  onClickCoolingYes(){
    this.displayCooling = "Yes";
    this.home.homeDetails.cooling = 1;
  }

  /*
  * Initialize the text of the roof age drop down button. Called on init()
  */
  initRoofDropDownText(home:IHome): void{
      
      if(home.homeDetails.roofAge == 0){
        $('#dropdownMenuButtonRoof').html('1-3 Years');
      } else if(home.homeDetails.roofAge == 1){
        $('#dropdownMenuButtonRoof').html('4-6 Years');
      } else if(home.homeDetails.roofAge == 2){
        $('#dropdownMenuButtonRoof').html('7-10 Years');
      }else if(home.homeDetails.roofAge == 3){
        $('#dropdownMenuButtonRoof').html('11-15 Years');
      } else if(home.homeDetails.roofAge == 4){
        $('#dropdownMenuButtonRoof').html('16+ Years');
      }
  }

  onClickDropdownOptionRoofOne(){
    this.home.homeDetails.roofAge = 0;
     $('#dropdownMenuButtonRoof').html('1-3 Years');
  }

  onClickDropdownOptionRoofTwo(){
    this.home.homeDetails.roofAge = 1;
    $('#dropdownMenuButtonRoof').html('4-6 Years');
  }

  onClickDropdownOptionRoofThree(){
    this.home.homeDetails.roofAge = 2;
    $('#dropdownMenuButtonRoof').html('7-10 Years');
  }

  onClickDropdownOptionRoofFour(){
    this.home.homeDetails.roofAge = 3;
    $('#dropdownMenuButtonRoof').html('11-15 Years');
  }

  onClickDropdownOptionRoofFive(){
    this.home.homeDetails.roofAge = 4;
    $('#dropdownMenuButtonRoof').html('16+ Years');
  }

  /*
  * Initialize the text of the bedroom drop down button. Called on init()
  */
  initBedroomsDropDownText(home:IHome): void{
      
      if(home.homeDetails.numBeds == -1){
        $('#dropdownMenuButtonBedrooms').html('Make Selection');
      } else if(home.homeDetails.numBeds == 1){
        $('#dropdownMenuButtonBedrooms').html('2');
      } else if(home.homeDetails.numBeds == 2){
        $('#dropdownMenuButtonBedrooms').html('3');
      }else if(home.homeDetails.numBeds == 3){
        $('#dropdownMenuButtonBedrooms').html('4');
      } else if(home.homeDetails.numBeds == 4){
        $('#dropdownMenuButtonBedrooms').html('5');
      }else if(home.homeDetails.numBeds == 5){
        $('#dropdownMenuButtonBedrooms').html('6');
      } else if(home.homeDetails.numBeds == 6){
        $('#dropdownMenuButtonBedrooms').html('7');
      }else if(home.homeDetails.numBeds == 7){
        $('#dropdownMenuButtonBedrooms').html('8');
      } else if(home.homeDetails.numBeds == 8){
        $('#dropdownMenuButtonBedrooms').html('9');
      }else if(home.homeDetails.numBeds == 9){
        $('#dropdownMenuButtonBedrooms').html('10');
      } else if(home.homeDetails.numBeds == 10){
        $('#dropdownMenuButtonBedrooms').html('11');
      }
  }

  bedroomDisplayNumber:number;

  onClickDropdownOptionBedroomMakeSelection(){
    this.home.homeDetails.numBaths = -1;
     $('#dropdownMenuButtonBedroom').html('Make Selection');
  }

  onClickDropdownOptionBedroomOne(){
    this.home.homeDetails.numBeds = 1;
     $('#dropdownMenuButtonBedroom').html('0');
  }

  onClickDropdownOptionBedroomTwo(){
    this.home.homeDetails.numBeds = 2;
    $('#dropdownMenuButtonBedroom').html('2');
  }

  onClickDropdownOptionBedroomThree(){
    this.home.homeDetails.numBeds = 3;
    $('#dropdownMenuButtonBedroom').html('3');
  }

  onClickDropdownOptionBedroomFour(){
    this.home.homeDetails.numBeds = 4;
    $('#dropdownMenuButtonBedroom').html('4');
  }

  onClickDropdownOptionBedroomFive(){
    this.home.homeDetails.numBeds = 5;
    $('#dropdownMenuButtonBedroom').html('5');
  }

  onClickDropdownOptionBedroomSix(){
    this.home.homeDetails.numBeds = 6;
     $('#dropdownMenuButtonBedroom').html('6');
  }

  onClickDropdownOptionBedroomSeven(){
    this.home.homeDetails.numBeds = 7;
    $('#dropdownMenuButtonBedroom').html('7');
  }

  onClickDropdownOptionBedroomEight(){
    this.home.homeDetails.numBeds = 8;
    $('#dropdownMenuButtonBedroom').html('8');
  }

  onClickDropdownOptionBedroomNine(){
    this.home.homeDetails.numBeds = 9;
    $('#dropdownMenuButtonBedroom').html('9');
  }

  onClickDropdownOptionBedroomTen(){
    this.home.homeDetails.numBeds = 10;
    $('#dropdownMenuButtonBedroom').html('10');
  }

  onClickDropdownOptionBedroomOther(){
    this.home.homeDetails.numBeds = -2;
    $('#dropdownMenuButtonBedroom').html('Other');
  }

/*----------------  Bathrooms  ---------------*/

    numBathroomsDisplay:number;
/*
  * Initialize the text of the bedroom drop down button. Called on init()
  */
  initBathroomsDropDownText(home:IHome): void{
      
      if(home.homeDetails.numBaths == -1){
        $('#dropdownMenuButtonBathrooms').html('Make Selection');
      } else if(home.homeDetails.numBaths == 1){
        $('#dropdownMenuButtonBathrooms').html('1');
      }  else if(home.homeDetails.numBaths == 1.5){
        $('#dropdownMenuButtonBathrooms').html('1.5');
      } else if(home.homeDetails.numBaths == 1.75){
        $('#dropdownMenuButtonBathrooms').html('1.75');
      } else if(home.homeDetails.numBaths == 2){
        $('#dropdownMenuButtonBathrooms').html('2');
      }  else if(home.homeDetails.numBaths == 2.5){
        $('#dropdownMenuButtonBathrooms').html('2.5');
      } else if(home.homeDetails.numBaths == 2.75){
        $('#dropdownMenuButtonBathrooms').html('2.75');
      } else if(home.homeDetails.numBaths == 3){
        $('#dropdownMenuButtonBathrooms').html('3');
      }  else if(home.homeDetails.numBaths == 3.5){
        $('#dropdownMenuButtonBathrooms').html('3.5');
      } else if(home.homeDetails.numBaths == 3.75){
        $('#dropdownMenuButtonBathrooms').html('3.75');
      } else if(home.homeDetails.numBaths == 4){
        $('#dropdownMenuButtonBathrooms').html('4');
      } else if(home.homeDetails.numBaths == 2){
        $('#dropdownMenuButtonBathrooms').html('Other');
      }
  }

  onClickDropdownOptionBathroomMakeSelection(){
    this.home.homeDetails.numBaths = -1;
     $('#dropdownMenuButtonBathroom').html('Make Selection');
  }

  onClickDropdownOptionBathroomOne(){
    this.home.homeDetails.numBaths = 1;
     $('#dropdownMenuButtonBathroom').html('1');
  }

  onClickDropdownOptionBathroomOneHalf(){
    this.home.homeDetails.numBaths = 1.5;
     $('#dropdownMenuButtonBathroom').html('1.5');
  }

  onClickDropdownOptionBathroomOne3Quarters(){
    this.home.homeDetails.numBaths = 1.75;
     $('#dropdownMenuButtonBathroom').html('1.75');
  }

  onClickDropdownOptionBathroomTwo(){
    this.home.homeDetails.numBaths = 2;
    $('#dropdownMenuButtonBathroom').html('2');
  }

  onClickDropdownOptionBathroomTwoHalf(){
    this.home.homeDetails.numBaths = 2.5;
    $('#dropdownMenuButtonBathroom').html('2.5');
  }

  onClickDropdownOptionBathroomTwo3Quarters(){
    this.home.homeDetails.numBaths = 2;
    $('#dropdownMenuButtonBathroom').html('2.75');
  }

  onClickDropdownOptionBathroomThree(){
    this.home.homeDetails.numBaths = 3;
    $('#dropdownMenuButtonBathroom').html('3');
  }

  onClickDropdownOptionBathroomThreeHalf(){
    this.home.homeDetails.numBaths = 3.5;
    $('#dropdownMenuButtonBathroom').html('3.5');
  }
  onClickDropdownOptionBathroomThree3Quarters(){
    this.home.homeDetails.numBaths = 3.75;
    $('#dropdownMenuButtonBathroom').html('3.75');
  }

  onClickDropdownOptionBathroomFour(){
    this.home.homeDetails.numBaths = 4;
    $('#dropdownMenuButtonBathroom').html('4');
  }

  onClickDropdownOptionBathroomOther(){
    this.home.homeDetails.numBaths = -2;
    $('#dropdownMenuButtonBathroom').html('Other');
  }

/*------------------ End Bathrooms ------------*/


  onClickCoolingDropdownOptionOne(){
    this.home.homeDetails.cooling = 0;
     $('#dropdownMenuButtonCooling').html('Central HVAC');
  }

  onClickCoolingDropdownOptionTwo(){
    this.home.homeDetails.cooling = 1;
    $('#dropdownMenuButtonCooling').html('Furnace & Swamp Cooler');
  }

  onClickCoolingDropdownOptionThree(){
    this.home.homeDetails.cooling = 2;
    $('#dropdownMenuButtonCooling').html('Swamp Cooler Only');
  }

  onClickCoolingDropdownOptionFour(){
    this.home.homeDetails.cooling = 3;
    $('#dropdownMenuButtonCooling').html('Window Unit(s)');
  }

  onClickCoolingDropdownOptionFive(){
    this.home.homeDetails.cooling = 4;
    $('#dropdownMenuButtonCooling').html('Furnace Only');
  }

  onClickCoolingDropdownOptionSix(){
    this.home.homeDetails.cooling = 5;
    $('#dropdownMenuButtonCooling').html('None');
  }

/*-------------End Cooling-----------------*/

  onClickDropdownOptionGarageMakeSelection(){
    this.home.homeDetails.carGarage = -1;
    $('#dropdownMenuButtonGarage').html('Make Selection');
    this.garageOther = false;
  }

  onClickDropdownOptionGarageOneSpots(){
    this.home.homeDetails.carGarage = 1;
    $('#dropdownMenuButtonGarage').html('1');
    this.garageOther = false;
  }

  onClickDropdownOptionGarageTwoSpots(){
    console.log("Garage Should be 2");
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

  /*--------------------------------------------------------------*/

  onClickBasementMakeSelection(){
    this.basementPercentageFinished = "Percentage Finished?";
    //this.home.homeDetails.basement = "None";
  }

  onClickBasement10(){
    this.basementPercentageFinished = "10%";
    this.home.homeDetails.basement = true;

  }

  onClickBasement25(){
     this.basementPercentageFinished = "25%";
     this.home.homeDetails.basement = true;

  }

  onClickBasement50(){
     this.basementPercentageFinished = "50%";
     this.home.homeDetails.basement = true;

  }

  onClickBasement75(){
     this.basementPercentageFinished = "75%";
     this.home.homeDetails.basement = true;

  }

  onClickBasement90(){
     this.basementPercentageFinished = "90%";
     this.home.homeDetails.basement = true;

  }

  onClickBasement100(){
     this.basementPercentageFinished = "100%";
     this.home.homeDetails.basement = true;
  }

}
