import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthenticationService } from '../../services/authentication.service';
import { FirestoreService } from '../../services/firestore.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('changeState', [
      state('state1', style({
        backgroundColor: 'green',
        transform: 'scale(1)'
      })),
      state('state2', style({
        backgroundColor: 'red',
        transform: 'scale(1.5)'
      })),
      transition('*=>state1', animate('300ms')),
      transition('*=>state2', animate('4000ms'))
    ]),
    trigger('fadeInOut', [
    transition(':enter', [   // :enter is alias to 'void => *'
      style({opacity:0}),
      animate(600, style({opacity:1})) 
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
      animate(1000, style({opacity:0})) 
    ])
  ])
  ]
})
export class LoginComponent implements OnInit {

  mSubscriptionUserRoles:Subscription;
  mSubscriptionAuth:Subscription;

  isStateResendEmail:boolean = false;
  newPasswordEmail:string = "";
  errorStatement:string = "";
  signInMessageHint:string = "Need a correctly formatted email and password before proceeding";
  sendForNewPasswordHint:string = "Need a correctly formatted email before proceeding";

  myFormEmail: FormGroup;
  myFormResetPassword: FormGroup;

  mLoginType:string = null;

  mRole:String;


  constructor(private mAuthService: AuthenticationService, private mAuth: AngularFireAuth ,private mRouter: Router, private mFormBuilder:FormBuilder, private mFirestoreService: FirestoreService) { 
  	    
  }

  ngOnInit() {
  
    this.mLoginType = window.history.state.data.route;

    if(this.mLoginType == null){
      this.mRouter.navigateByUrl('home');
    }


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


    // if(this.mSubscriptionAuth){
    //   this.mSubscriptionAuth.unsubscribe();
    // }

    // this.mSubscriptionAuth = this.mAuth.authState.subscribe(user => {
    //  if(user){
    //   this.getUserRole(user.uid);
    //  }
     
      
    // });
  }

  login(){  
  	this.mAuthService.login(this.email.value,this.password.value)
  	  .subscribe(
  		success => console.log("signed in"),
  		error => alert(error)
  		);
  }

  getUserRole(uid){
   
    
    if(this.mSubscriptionUserRoles){
      this.mSubscriptionUserRoles.unsubscribe();
    }

    this.mSubscriptionUserRoles = this.mFirestoreService.getUserRoles(uid).subscribe(userRoles => {
      
      if(userRoles == null){
        this.mRole = null;
        return;
      }

      if(userRoles.role.seller == true){
        this.mRouter.navigateByUrl('seller');
      }else if(userRoles.role.investor == true){
        this.mRouter.navigateByUrl('investor/property-profile');
      }else if(userRoles.role.admin == true){
        this.mRole = 'admin';
      }else{
        this.mRole = null;
      }

    });
  }

  onCreateAccount(){
    console.log(this.mLoginType);
    if(this.mLoginType == "investor"){
      this.mRouter.navigateByUrl('authentication');
    }else {
      this.mRouter.navigateByUrl('create-account');
    }
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
