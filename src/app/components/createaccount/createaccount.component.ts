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

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.scss']
})
export class CreateaccountComponent implements OnInit {

  loading = false;
  success = false;
  errorStatement = '';
  
  isUpdatedByText:boolean = false;
  isUpdatedByEmail:boolean = false;
  
  mSellerPropertyDetails:PropertyDetails;
  myFormContact: FormGroup;
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

    this.myFormContact = this.mFormBuilder.group({
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
      phone: ['', [
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

    this.myFormContact.valueChanges.subscribe(contactForm => {
      this.mSellerContactInfo.first_name = contactForm.firstName;
      this.mSellerContactInfo.last_name = contactForm.lastName;
      this.mSellerContactInfo.email = contactForm.email;
      this.mSellerContactInfo.phone = contactForm.phone;
    });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPassword = group.get('confirmPassword').value;

    return pass === confirmPassword ? null : { notSame: true }     
  }
  
  createUserAccount(){

    this.mSellerContactInfo.created_account_timestamp = firebase.firestore.FieldValue.serverTimestamp();

    this.mAuth.auth.createUserWithEmailAndPassword(this.myFormContact.value.email, this.myFormContact.value.password).then(user => {
      if(user != null){
        this.userID = user.user.uid;
        this.mFirestoreService.saveSellerContactInformation(this.userID,Object.assign({},this.mSellerContactInfo));
        this.mFirestoreService.saveSellerPropertyDetails(this.userID,Object.assign({}, this.mSellerPropertyDetails));
        this.mRouter.navigate(['./listing-time']);    
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
        phone:this.phone.value,
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
        this.myFormContact.reset();
          this.mRouter.navigateByUrl('/listing-time');
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
    this.phone.setValue(this.phone.value.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'$1-$2-$3'));
  }

  /*Reactive Form Methods*/
  get firstName() {
    return this.myFormContact.get('firstName');
  }

  get lastName() {
    return this.myFormContact.get('lastName');
  }

  get email() {
    return this.myFormContact.get('email');
  }

  get phone() {
    return this.myFormContact.get('phone');
  }

  get updatesEmail() {
    return this.myFormContact.get('updatesEmail');
  }

  get updatesText() {
    return this.myFormContact.get('updatesText');
  }

  get password() {
    return this.myFormContact.get('password');
  }

  get confirmPassword() {
    return this.myFormContact.get('confirmPassword');
  }


}
