import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthenticationService } from '../../services/authentication.service';

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

  isStateResendEmail:boolean = false;
  newPasswordEmail:string = "";
  errorStatement:string = "";
  signInMessageHint:string = "Need a correctly formatted email and password before proceeding";
  sendForNewPasswordHint:string = "Need a correctly formatted email before proceeding";

  myFormEmail: FormGroup;
  myFormResetPassword: FormGroup;

  mLoginType:string = null;


  constructor(private mAuthService: AuthenticationService, private mRouter: Router, private mFormBuilder:FormBuilder) { 
  	    
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
  }

  login(){  
  	this.mAuthService.login(this.email.value,this.password.value)
  	  .subscribe(
  		success => this.mRouter.navigate(['/home']),
  		error => alert(error)
  		);
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
