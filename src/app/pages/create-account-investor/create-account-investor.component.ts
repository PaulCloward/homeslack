import { Component, OnInit, Input,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { IInvestor } from '../../model/IInvestor';
import { FirestoreService } from '../../services/firestore.service';
import { PropertyDetails } from '../../class/PropertyDetails';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-create-account-investor',
  templateUrl: './create-account-investor.component.html',
  styleUrls: ['./create-account-investor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateAccountInvestorComponent implements OnInit {

  mFormInvestorInformation: FormGroup;
  mInvestorInformation:IInvestor;

  // Form state
  loading = false;
  success = false;

  readonly mEmailPattern:string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  readonly mPhoneNumberPattern:string = "^(\+\d{1,3}[- ]?)?\d{10}$";

  constructor(private mAuth:AngularFireAuth, private mFirestoreService: FirestoreService, private mRouter: Router, private mFormBuilder:FormBuilder) { }

  ngOnInit() {

    this.mFormInvestorInformation = this.mFormBuilder.group({
      companyName: ['', [
        Validators.required
      ]],
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      phoneNumber: ['', [ 
        Validators.required,
        // ValidationPhoneNumber.checkLimit(9,11),
        Validators.pattern("^[0-9]+$")
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      companyAddress: ['', [
        Validators.required
      ]],
      suite: ['', [
       
      ]],
      city: ['', [
        Validators.required
      ]],
      zipCode: ['', [
        Validators.required
      ]],
      ein: ['', [
        
      ]],
      socialSecurity: ['', [
       
      ]],
      companyType: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
 
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
      ]]
    }, {validator: this.checkPasswords });
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.get('password').value;
  let confirmPassword = group.get('confirmPassword').value;

  return pass === confirmPassword ? null : { notSame: true }     
}

    async submitHandler() {
      this.loading = true;

      const formValue = this.mFormInvestorInformation.value;
      console.log(formValue);
      return;

      try {
        await this.mFirestoreService.onCreateInvestorSaveInformation("", formValue);
        this.success = true;
      } catch(err) {
        console.error(err)
      }

      this.loading = false;
    }

    get companyName() {
      return this.mFormInvestorInformation.get('companyName');
    }

    get firstName() {
      return this.mFormInvestorInformation.get('firstName');
    }

    get lastName() {
      return this.mFormInvestorInformation.get('lastName');
    }

    get phoneNumber() {
      return this.mFormInvestorInformation.get('phoneNumber');
    }

    get email() {
      return this.mFormInvestorInformation.get('email');
    }
  
    get companyAddress() {
      return this.mFormInvestorInformation.get('companyAddress');
    }
  
    get suite() {
      return this.mFormInvestorInformation.get('suite');
    }

    get city() {
      return this.mFormInvestorInformation.get('city');
    }

    get zipCode() {
      return this.mFormInvestorInformation.get('zipCode');
    }

    get ein() {
      return this.mFormInvestorInformation.get('ein');
    }
  
    get socialSecurity() {
      return this.mFormInvestorInformation.get('socialSecurity');
    }

    get companyType() {
      return this.mFormInvestorInformation.get('companyType');
    }

    get password() {
      return this.mFormInvestorInformation.get('password');
    }
  
    get confirmPassword() {
      return this.mFormInvestorInformation.get('confirmPassword');
    }

}
