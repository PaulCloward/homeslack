import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lock',
  templateUrl: './lock.component.html',
  styleUrls: ['./lock.component.css']
})
export class LockComponent implements OnInit {

  loginEmail:string;
  loginPassword:string;
  requestEmail:string;
  requestMessage:string;
  errorMessage:string;

  isRequestAccessSubmitted:boolean = false;

  loginForm: FormGroup;
  requestForm: FormGroup;

  smallScreenSignInView:boolean = true;

  constructor(private mFB: FormBuilder, private mAuth:AngularFireAuth, private mAuthService:AuthenticationService
    , private mRouter: Router) { }

  ngOnInit() {
    this.loginForm = this.mFB.group({
      email: '',
      password: ''
    });

    this.loginForm.valueChanges.subscribe(
      loginInfo => {
        this.loginEmail = loginInfo.email;
        this.loginPassword = loginInfo.password;
      });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  
  login(){
    this.mAuthService.login(this.loginEmail,this.loginPassword)
      .subscribe(
      success => this.mRouter.navigate(['/home']),
      error => this.errorMessage = error
      );
  }

}
