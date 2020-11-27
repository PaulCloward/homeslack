import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthenticationService } from '../../services/authentication.service';
import { FirestoreService } from '../../services/firestore.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.scss']
})
export class SellerLoginComponent implements OnInit {
  
    mSubscriptionUserRoles:Subscription;
    mSubscriptionAuth:Subscription;
  
    isStateResendEmail:boolean = false;
    newPasswordEmail:string = "";
    errorStatement:string = "";
    signInMessageHint:string = "Need a correctly formatted email and password before proceeding";
    sendForNewPasswordHint:string = "Need a correctly formatted email before proceeding";
  
    myFormEmail: FormGroup;
    myFormResetPassword: FormGroup;
  
    mRole:String;
  
  
    constructor(private mAuthService: AuthenticationService, private mAuth: AngularFireAuth ,private mRouter: Router, private mFormBuilder:FormBuilder, private mFirestoreService: FirestoreService) { 
          
    }
  
    ngOnInit() {
  
  
  
      this.myFormEmail = this.mFormBuilder.group({
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        password: ['', [
          Validators.required,
          Validators.minLength(5)
        ]]
      });
  
      this.myFormResetPassword = this.mFormBuilder.group({
        emailForNewPassword: ['', [
          Validators.required,
          Validators.email
        ]]
      });

    }
  
    login(){  
      this.mAuthService.login(this.email.value,this.password.value)
        .subscribe(
        success => console.log("signed in"),
        error => alert(error)
        );
    }

  
    onCreateAccount(){
      this.mRouter.navigateByUrl('authentication/seller-register');
    }
  
    get email() {
      return this.myFormEmail.get('email');
    }
  
    get password() {
      return this.myFormEmail.get('password');
    }
  
    get emailForNewPassword() {
      return this.myFormResetPassword.get('emailForNewPassword');
    }
  }
  