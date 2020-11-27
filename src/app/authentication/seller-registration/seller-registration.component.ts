import { Component, OnInit, Input } from '@angular/core';
  import { Router } from '@angular/router';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { Seller } from '../../class/Seller';
  import { FirestoreService } from '../../services/firestore.service';
  import * as firebase from 'firebase/app';
  import { SellerPropertyService } from '../../services/seller-property.service';
  import { PropertyDetails } from '../../class/PropertyDetails';
  import { AngularFireAuth } from '@angular/fire/auth';
  import { ISellerInformation } from '../../model/ISellerInformation';
  import { IUserRoles } from '../../model/IUserRoles';
  import { Subscription } from 'rxjs';
@Component({
  selector: 'app-seller-registration',
  templateUrl: './seller-registration.component.html',
  styleUrls: ['./seller-registration.component.scss']
})
export class SellerRegistrationComponent implements OnInit {
  
  
    loading = false;
    success = false;
    errorStatement = '';
    
    isUpdatedByText:boolean = false;
    isUpdatedByEmail:boolean = false;
    
    mSellerPropertyDetails:PropertyDetails;
    mFormSellerInformation: FormGroup;
    mSellerContactInfo:Seller;
    
    @Input() alertMessage:string;
    userID:string;
  
    constructor(private mAuth:AngularFireAuth, private mSellerPropertyService: SellerPropertyService, private mFirestoreService: FirestoreService, private mRouter: Router, private mFormBuilder:FormBuilder) { }
  
    ngOnInit() {
  
      this.mSellerPropertyService.getSellerPropertyDetailsSource().subscribe(propertyDetails =>{
          this.mSellerPropertyDetails = propertyDetails;
      });
  
      let emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
      let phoneNumberPattern = "^(\+\d{1,3}[- ]?)?\d{10}$";
  
      this.mFormSellerInformation = this.mFormBuilder.group({
        firstName: ['', [
          Validators.required
        ]],
        lastName: ['', [
          Validators.required
        ]],
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        phoneNumber: ['', [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12)
        ]],
        updatesText: ['', [
          Validators.required
        ]],
        updatesEmail: ['', [
          Validators.required
        ]],
        password: ['', [
          Validators.required,
         // Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
        ]],
        confirmPassword: ['', [
          Validators.required,
          //Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
        ]]
      }, {validator: this.checkPasswords });
  
      this.updatesEmail.setValue(false);
      this.updatesText.setValue(false);
  
      this.mSellerContactInfo = new Seller();
    }
  
    checkPasswords(group: FormGroup) { // here we have the 'passwords' group
      let pass = group.get('password').value;
      let confirmPassword = group.get('confirmPassword').value;
  
      return pass === confirmPassword ? null : { notSame: true }     
    }
    
    createUserAccount(){
  
      this.mSellerContactInfo.created_account_timestamp = firebase.firestore.FieldValue.serverTimestamp();
  
      this.mAuth.auth.createUserWithEmailAndPassword(this.mFormSellerInformation.value.email, this.mFormSellerInformation.value.password).then(user => {
        if(user != null){
          this.userID = user.user.uid;
          this.mFirestoreService.saveSellerContactInformation(this.userID,Object.assign({},this.mSellerContactInfo));
          this.mFirestoreService.saveSellerPropertyDetails(this.userID,Object.assign({}, this.mSellerPropertyDetails));
          this.mRouter.navigate(['./timeframe']);    
        }
      }).catch(error => {
        error => this.alertMessage = error;
      });
    }
  
    async createAccount() {
  
      this.loading = true;
      this.errorStatement = "";
  
      let email:string = this.email.value;
      let password:string = this.password.value;
  
     
      let result = this.mAuth.auth.createUserWithEmailAndPassword(email, password);
      result.then(success => {
  
        // success.user.updatePhoneNumber(this.phoneNumber.value);
        let uuid = success.user.uid;
        this.mFirestoreService.saveSellerContactInformation(uuid,Object.assign({},this.mSellerContactInfo));
        this.mFirestoreService.saveSellerPropertyDetails(uuid,Object.assign({}, this.mSellerPropertyDetails));
  
        let sellerInformation:ISellerInformation = {
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          my_uid: uuid,
          first_name: this.firstName.value,
          last_name:this.lastName.value,
          phoneNumber:this.phoneNumber.value,
          email:this.email.value,
          updates_text:this.updatesText.value,
          updates_email:this.updatesEmail.value,
        };
  
        this.mFirestoreService.saveSellerInformation(uuid, sellerInformation).then(success => {
  
          let userRoles:IUserRoles = {
            my_uid: uuid,
            role: {
              admin: false,
              investor: false,
              seller: true
            }
          }
  
          this.mFirestoreService.saveUserRoles(uuid, userRoles).then(success => {
            console.log("Successfully registered as an seller");
  
            // Clear form info
          this.mFormSellerInformation.reset();
            this.mRouter.navigateByUrl('/timeframe');
          }).catch(error => {
            console.log("Seller registration failed: " + error);
          })
    
  
          
  
        }).catch(error => {
          console.log("Was not able to save investor information: " + error);
        });
      }).catch(error => {
        console.log("Was not able to create investor account: " + error);
          console.log(error.message);
      });
  
  
      this.loading = false;
    }
    
    onClickTerms(){
      this.mRouter.navigate(['./terms']);
    }
  
    onPhoneInput(e:any){ 
      this.phoneNumber.setValue(this.phoneNumber.value.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'$1-$2-$3'));
    }

    clickSignIn(){
      this.mRouter.navigateByUrl('authentication/seller-login');
    }
  
    /*Reactive Form Methods*/
    get firstName() {
      return this.mFormSellerInformation.get('firstName');
    }
  
    get lastName() {
      return this.mFormSellerInformation.get('lastName');
    }
  
    get email() {
      return this.mFormSellerInformation.get('email');
    }
  
    get phoneNumber() {
      return this.mFormSellerInformation.get('phoneNumber');
    }
  
    get updatesEmail() {
      return this.mFormSellerInformation.get('updatesEmail');
    }
  
    get updatesText() {
      return this.mFormSellerInformation.get('updatesText');
    }
  
    get password() {
      return this.mFormSellerInformation.get('password');
    }
  
    get confirmPassword() {
      return this.mFormSellerInformation.get('confirmPassword');
    }
  
  
  }
  