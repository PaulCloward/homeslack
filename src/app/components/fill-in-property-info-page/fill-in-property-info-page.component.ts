import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertyDetails } from '../../class/PropertyDetails';
import { SellerPropertyService } from '../../services/seller-property.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
   selector: 'app-fill-in-property-info-page',
  templateUrl: './fill-in-property-info-page.component.html',
  styleUrls: ['./fill-in-property-info-page.component.css']
})
export class FillInPropertyInfoPageComponent implements OnInit {

  userUID:string;
  sellerProperty:PropertyDetails;
  otherBeds:boolean = false;
  otherGarage:boolean = false;
  otherBathCount:boolean = false;

  loggedIn:boolean = false;

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


 statesInAmericaArray :string[] = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

  constructor(private mAuth:AngularFireAuth, private mSellerPropertyService: SellerPropertyService, private mRouter: Router,
    private mFormBuilder:FormBuilder, private mFirestoreService:FirestoreService) {
   }

  ngOnInit() {



    this.mAuth.authState.subscribe(
      user => {
        if(user){
          this.loggedIn = true;
          this.userUID = user.uid;

        }else{
          this.loggedIn = false;
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
        streetAddress: ['', [
          Validators.required
        ]],
        unitNumber: ['', [
          Validators.required,
          Validators.maxLength(6),
        ]],
        city: ['', [
          Validators.required,
          Validators.pattern('[a-zA-Z]+')
        ]],
        state: ['', [
          Validators.required,
          Validators.pattern('[a-zA-Z]+')
        ]],
        zipCode: ['', [
          Validators.required
        ]]
      });


      this.mFormPropertyDetails = this.mFormBuilder.group({
        livingSquareFeet: ['', [
          Validators.required
        ]],
        lotSize: ['', [
          Validators.required,
          Validators.maxLength(6),
        ]],
        lotSizeUnit: ['', [
          Validators.required,
          Validators.pattern('[a-zA-Z]+')
        ]],
        year: ['', [
          Validators.required,
          Validators.pattern('[a-zA-Z]+')
        ]],
        beds: ['', [
          Validators.required
        ]],
        baths: ['', [
          Validators.required
        ]],
        garage: ['', [
          Validators.required
        ]],
        basement: ['', [
          Validators.required
        ]],
        pool_description: ['', [

        ]],
        cooling_type: ['', [
          Validators.required
        ]],
        hot_tub_descriptions: ['', [
          Validators.required
        ]],
        roof_age_range: ['', [
          Validators.required
        ]],
        concerns_hvac_roofing_etc: ['', [
          Validators.required
        ]],
        concerns_other: ['', [
          Validators.required
        ]],

      });

      this.mFormAddressFields.valueChanges.subscribe(addressForm => {

        if(addressForm){

          this.sellerProperty.address.street = addressForm.streetAddress;
          this.sellerProperty.address.state = addressForm.state;
          this.sellerProperty.address.city = addressForm.city;
          this.sellerProperty.address.zip_code = addressForm.zipCode;


          if(addressForm.unitNumber != null && addressForm.unitNumber != ''){
            this.sellerProperty.address.unit = addressForm.unitNumber;
          }

          this.mSellerPropertyService.updateSellerPropertyDetailsSource(this.sellerProperty);
          }
      });


  }

  arrayRange(n: number, startFrom: number): number[] {
    return [...Array(n).keys()].map(i => startFrom - i);
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

  onSelectBathCount(bathCount:number){
    if(bathCount >= 1){
       this.sellerProperty.baths = bathCount;
       this.otherBathCount = false;
    }else{
      this.sellerProperty.baths = null;
      this.otherBathCount = true;
    }
  }

  onBasementExisting(isBasment:boolean){
    this.sellerProperty.basement = isBasment;
    if(isBasment){
      this.sellerProperty.basement_completed = 1;
    }else{
      this.sellerProperty.basement_completed = 0;
    }
  }

  onSelectGarageSpots(spots:number){
    if(spots > 0){
      this.sellerProperty.garage = spots;
      this.otherGarage = false;
    }else {
      this.sellerProperty.garage = null;
      this.otherGarage = true;
    }
  }

  onClickNext(){
    this.mSellerPropertyService.updateSellerPropertyDetailsSource(this.sellerProperty);
    this.mFirestoreService.saveSellerPropertyDetails(this.userUID,Object.assign({},this.sellerProperty));
    this.mRouter.navigate(['/listing-time']);
  }

  onClickCreateAccount(){
    this.mSellerPropertyService.updateSellerPropertyDetailsSource(this.sellerProperty);
    this.mRouter.navigate(['./create-account']);
  }


}
