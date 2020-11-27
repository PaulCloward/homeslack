import { Component, OnInit, Input,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import * as firebase from 'firebase/app';

import { IInvestor } from '../../model/IInvestor';
import { FirestoreService } from '../../services/firestore.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { IInvestorInformation } from '../../model/IInvestorInformation';
import { IUserRoles } from '../../model/IUserRoles';
import { ConfirmPasswordValidator } from '../../validators/confirm-password.validator';

@Component({
  selector: 'app-investor-registration',
  templateUrl: './investor-registration.component.html',
  styleUrls: ['./investor-registration.component.scss']
})
export class InvestorRegistrationComponent implements OnInit {

  mFormInvestorInformation: FormGroup;
  mInvestorInformation:IInvestor;

  errorStatement:string = "";

  // Form state
  loading = false;
  success = false;

  mEmailPattern:string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  mPhoneNumberPattern:string = "^(\+\d{1,3}[- ]?)?\d{10}$";

  btnCompanyType:string = "Company Type";

  constructor(private mAuth:AngularFireAuth, private mFirestoreService: FirestoreService, private mRouter: Router, private mFormBuilder:FormBuilder) { }

  ngOnInit() {

    this.mFormInvestorInformation = this.mFormBuilder.group({
      companyName: ['', [
        Validators.required
      ]],
      contactName: ['', [
        Validators.required
      ]],
      phoneNumber: ['',  
        [Validators.required,Validators.minLength(12), Validators.maxLength(12)]
      ],
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
      ssNumber: ['', [
       
      ]],
      ein: ['', [
       
      ]],
      updatesText: ['', [
        Validators.required
      ]],
      updatesEmail: ['', [
        Validators.required
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

    }, { validator: ConfirmPasswordValidator.MatchPassword });


    this.updatesEmail.setValue(false);
    this.updatesText.setValue(false);
  }

  onClickCompanyType(companyType:string){
    this.btnCompanyType = companyType;
    this.companyType.setValue(companyType);
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPassword = group.get('confirmPassword').value;

    return pass === confirmPassword ? null : { notSame: true }     
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

        let investorInformation:IInvestorInformation = {
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          my_uid: uuid,
          company_name: this.companyName.value,
          contact_name:this.contactName.value,
          phone:this.phoneNumber.value,
          email:this.email.value,
          company_address:this.companyAddress.value,
          suite:this.suite.value,
          city:this.city.value,
          zip_code:this.zipCode.value,
          ein:this.ein.value,
          social:this.ssNumber.value,
          company_type:this.companyType.value,
          updates_text:this.updatesText.value,
          updates_email:this.updatesEmail.value,
        };

        this.mFirestoreService.saveInvestorInformation(uuid, investorInformation).then(success => {

          let userRoles:IUserRoles = {
            my_uid: uuid,
            role: {
              admin: false,
              investor: true,
              seller: false
            }
          }

          this.mFirestoreService.saveUserRoles(uuid, userRoles).then(success => {
            console.log("Successfully registered as an investor");
            this.mRouter.navigateByUrl('/investor');
          }).catch(error => {
            console.log("Investor registration failed: " + error);
          })
    

          // Clear form info
          this.mFormInvestorInformation.reset();

        }).catch(error => {
          console.log("Was not able to save investor information: " + error);
        });
      }).catch(error => {
        console.log("Was not able to create investor account: " + error);
          console.log(error.message);
      });


      this.loading = false;
    }

    clickSignIn(){
      this.mRouter.navigateByUrl('authentication/investor-login');
    }

    onPhoneInput(e:any){
      this.phoneNumber.setValue(this.phoneNumber.value.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'$1-$2-$3'));
    }

    get companyName() {
      return this.mFormInvestorInformation.get('companyName');
    }

    get contactName() {
      return this.mFormInvestorInformation.get('contactName');
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
  
    get ssNumber() {
      return this.mFormInvestorInformation.get('ssNumber');
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

    get updatesEmail() {
      return this.mFormInvestorInformation.get('updatesEmail');
    }
  
    get updatesText() {
      return this.mFormInvestorInformation.get('updatesText');
    }
}
