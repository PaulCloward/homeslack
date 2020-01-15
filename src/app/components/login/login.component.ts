import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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

  public user$ = this.firebaseService.user;

  myFormEmail: FormGroup;
  myFormResetPassword: FormGroup;

  constructor(private firebaseService: FirebaseService, private router: Router, private mFormBuilder:FormBuilder) { 
  	    
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
  	this.firebaseService.login(this.email.value,this.password.value)
  	  .subscribe(
  		success => this.router.navigate(['/home']),
  		error => alert(error)
  		);
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
