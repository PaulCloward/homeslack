import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Seller } from '../../class/Seller';
import { FirestoreService } from '../../services/firestore.service';
import * as firebase from 'firebase/app';
import { SellerPropertyService } from '../../services/seller-property.service';
import { PropertyDetails } from '../../class/PropertyDetails';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
  
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
        // ValidationPhoneNumber.checkLimit(9,11),
        // Validators.pattern("^[0-9]+$")
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
  
  onClickTerms(){
    this.mRouter.navigate(['./terms']);
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

  get password() {
    return this.myFormContact.get('password');
  }

  get confirmPassword() {
    return this.myFormContact.get('confirmPassword');
  }
}
