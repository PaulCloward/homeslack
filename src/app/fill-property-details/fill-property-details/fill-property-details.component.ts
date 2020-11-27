import { Component, OnInit } from '@angular/core';
import { CustomValidators } from 'ng2-validation';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from '../../services/firestore.service';
import { SellerPropertyService } from '../../services/seller-property.service';
import { Router } from '@angular/router';
import { PropertyDetails } from '../../class/PropertyDetails';

@Component({
  selector: 'app-fill-property-details',
  templateUrl: './fill-property-details.component.html',
  styleUrls: ['./fill-property-details.component.scss']
})
export class FillPropertyDetailsComponent implements OnInit {

  userUID:string;
  sellerProperty:PropertyDetails;
  otherBeds:boolean = false;
  otherGarage:boolean = false;
  otherBathCount:boolean = false;

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
  nextPageHint:string = "Please fill in a valid street address, city, state, and zip code before continuing to the next page";
  garageOther:boolean = false;

  mFormAddressFields:FormGroup;
  mFormPropertyDetails:FormGroup;


 bedArray:number[] = [1,2,3,4,5,6,7,8,9,10];
 statesInAmericaArray :string[] = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
  yearArray:number[] = [];
  bathroomArray:number[] = [];
  coolingArray:string[] = [];
  garageArray:number[] = [];


  constructor(private mAuth:AngularFireAuth, private mSellerPropertyService: SellerPropertyService, private mRouter: Router,
    private mFormBuilder:FormBuilder, private mFirestoreService:FirestoreService) {
   }

  ngOnInit() {

    
    
    this.mAuth.authState.subscribe(
      user => {
        if(user){
          this.userUID = user.uid;
        }else{
          this.userUID = null;
        }
      }
    );

    this.mSellerPropertyService.getSellerPropertyDetailsSource().subscribe(propertyDetails =>{
      if(propertyDetails){
        this.sellerProperty = propertyDetails;
      }
    })

      this.mFormAddressFields = this.mFormBuilder.group({
        streetAddress: [null, [
          Validators.required
        ]],
        unitNumber: [null, [
         
        ]],
        city: [null, [
          Validators.required,
          // Validators.pattern('/^([a-z]+\s)*[a-z]+$/')
        ]],
        state: [null, [
          
          Validators.pattern('[a-zA-Z]+')
        ]],
        zipCode: [null, [
          Validators.required
        ]]
      });


      this.mFormPropertyDetails = this.mFormBuilder.group({
        livingSquareFeet: ['', [
          Validators.required,
          CustomValidators.max(5)
        ]],
        lotSize: [null, [
          Validators.required,
          CustomValidators.max(6)
        ]],
        lotSizeUnit: ['', [
          Validators.required
        ]],
        yearBuilt: [null, [
          Validators.required,
          CustomValidators.max(4)
        ]],
        beds: [null, [
          Validators.required,
          CustomValidators.max(2)
        ]],
        baths: [null, [
          Validators.required,
          CustomValidators.max(2)
        ]],
        garage: [null, [
          Validators.required,
          CustomValidators.max(2)
        ]],
        basement: [null, [
          Validators.required
        ]],
        poolDescription: [null, [

        ]],
        cooling: [null, [
          Validators.required
        ]],
        hotTub: [null, [
          Validators.required
        ]],
        hotTubDescription: [null, [
        
        ]],
        roofAge: [null, [
          Validators.required
        ]],
        concernsHVAC: [null, [
          Validators.required
        ]],
        concernsOther: [null, [
          Validators.required
        ]],

      });

      this.initYearArray();
      this.initBathroomArray();
      this.initCoolingArray();
      this.initGarageArray();


      // this.mFormAddressFields.valueChanges.subscribe(addressForm => {

      //   if(addressForm){

      //     this.sellerProperty.address.street = addressForm.streetAddress;
      //     //this.sellerProperty.address.state = addressForm.state;
      //     this.sellerProperty.address.city = addressForm.city;
      //     this.sellerProperty.address.zip_code = addressForm.zipCode;


      //     if(addressForm.unitNumber != null && addressForm.unitNumber != ''){
      //       this.sellerProperty.address.unit = addressForm.unitNumber;
      //     }

      //     this.mSellerPropertyService.updateSellerPropertyDetailsSource(this.sellerProperty);
      //     }
      // });

      // this.mFormPropertyDetails.valueChanges.subscribe(propertyDetails => {

      //   if(propertyDetails){

      //     this.sellerProperty.living_square_feet= propertyDetails.livingSquareFeet;
      //     this.sellerProperty.lot_size = propertyDetails.lotSize;
        
      //     if(propertyDetails.beds != null){
      //       this.sellerProperty.beds = propertyDetails.beds;
      //     }

        
      //     if(propertyDetails.zipCode != null && propertyDetails.zipCode != undefined){
      //       this.sellerProperty.address.zip_code = propertyDetails.zipCode;
      //     }
         


      //     if(propertyDetails.unitNumber != null && propertyDetails.unitNumber != ''){
            
      //       if(propertyDetails.unitNumber.length > 6){
      //         propertyDetails.unitNumber = propertyDetails.unitNumber.slice(0, 6);
      //       }else{
      //         this.sellerProperty.address.unit = propertyDetails.unitNumber;
      //       }
      //     }

      //     this.mSellerPropertyService.updateSellerPropertyDetailsSource(this.sellerProperty);
      //     }
      // });
  }

  navigatePage(path:string){
    this.mRouter.navigateByUrl(path);
  }

  initYearArray(){
    let i = 2020;
    while(i >= 1950){
      this.yearArray.push(i);
      i -= 1;
    }
  }

  initBathroomArray(){
    this.bathroomArray.push(1);
    this.bathroomArray.push(1.5);
    this.bathroomArray.push(1.75);
    this.bathroomArray.push(2);
    this.bathroomArray.push(2.5);
    this.bathroomArray.push(2.75);
    this.bathroomArray.push(3);
    this.bathroomArray.push(3.5);
    this.bathroomArray.push(3.75);
    this.bathroomArray.push(4);
    this.bathroomArray.push(-1);
  }

  initGarageArray(){
    this.garageArray.push(1);
    this.garageArray.push(2);
    this.garageArray.push(3);
    this.garageArray.push(4);
    this.garageArray.push(-1);
  }

  initCoolingArray(){
    this.coolingArray.push('Central HVAC');
    this.coolingArray.push('Furnace & Swamp Cooler');
    this.coolingArray.push('Swamp Cooler Only');
    this.coolingArray.push('Window Unit(s)');
    this.coolingArray.push('Furnace Only');
    this.coolingArray.push('None');
  }
  
  arrayRange(n: number, startFrom: number): number[] {
    return [...Array(n).keys()].map(i => startFrom - i);
  }


  onSelectBathCount(bathCount:number){
    if(bathCount >= 1){
       this.baths.setValue(bathCount);
       this.otherBathCount = false;
    }else{
      this.sellerProperty.baths = null;
      this.otherBathCount = true;
    }
  }

  onBasementExisting(isBasment:boolean){
    this.basement.setValue(isBasment);
    if(isBasment){
      this.basementCompleted.setValue(1);
    }else{
      this.basementCompleted.setValue(0);
    }
  }

  onSelectGarageSpots(spots:number){
    if(spots > 0){
      this.garage.setValue(spots);
      this.otherGarage = false;
    }else {
      this.garage.setValue(-1);
      this.otherGarage = true;
    }
  }

  onClickNext(){
    this.mSellerPropertyService.updateSellerPropertyDetailsSource(this.sellerProperty);
    this.mFirestoreService.saveSellerPropertyDetails(this.userUID,Object.assign({},this.sellerProperty));
    this.mRouter.navigate(['/timeframe']);
  }

  onClickCreateAccount(){
    this.mSellerPropertyService.updateSellerPropertyDetailsSource(this.sellerProperty);
    this.mRouter.navigate(['./authentication/seller-register']);
  }


  get streetAddress() {
    return this.mFormAddressFields.get('streetAddress');
  }

  get unitNumber() {
    return this.mFormAddressFields.get('unitNumber');
  }

  get state() {
    return this.mFormAddressFields.get('state');
  }

  get city() {
    return this.mFormAddressFields.get('city');
  }

  get zipCode() {
    return this.mFormAddressFields.get('zipCode');
  }

  get livingSquareFeet(){
    return this.mFormPropertyDetails.get('livingSquareFeet');
  }

  get yearBuilt(){
    return this.mFormPropertyDetails.get('yearBuilt');
  }

  get lotSize(){
    return this.mFormPropertyDetails.get('lotSize');
  }

  get lotSizeUnit(){
    return this.mFormPropertyDetails.get('lotSizeUnit');
  }

  get beds(){
    return this.mFormPropertyDetails.get('beds');
  }

  get baths(){
    return this.mFormPropertyDetails.get('baths');
  }

  get basement(){
    return this.mFormPropertyDetails.get('basement');
  }

  get basementCompleted(){
    return this.mFormPropertyDetails.get('basementCompleted');
  }

  get garage(){
    return this.mFormPropertyDetails.get('garage');
  }

  get pool(){
    return this.mFormPropertyDetails.get('pool');
  }

  get poolDescription(){
    return this.mFormPropertyDetails.get('poolDescription');
  }


  get hotTub(){
    return this.mFormPropertyDetails.get('hotTub');
  }

  get hotTubDescription(){
    return this.mFormPropertyDetails.get('hotTubDescription');
  }

  get cooling(){
    return this.mFormPropertyDetails.get('cooling');
  }

  get roofAge(){
    return this.mFormPropertyDetails.get('roofAge');
  }

  get concernsHVAC(){
    return this.mFormPropertyDetails.get('concernsHVAC');
  }

  get concernsOther(){
    return this.mFormPropertyDetails.get('concernsOther');
  }
}
