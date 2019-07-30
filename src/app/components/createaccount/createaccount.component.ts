import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IUser } from '../../model/IUser';
import { IHome } from '../../model/IHome';
import { HomeService } from '../../services/home.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {

  private TAG: String = "CREATE ACCOUNT: "; 

  public user$ = this.firebaseService.user;
  
  isUpdatedByText:boolean = false;
  isUpdatedByEmail:boolean = false;
  /*firstName:string;
  lastName:string;
  phone:string;*/
  email2:string;
  password2:string;
  confirmPassword:string;
  
  home:IHome;
  myForm: FormGroup;
  
  @Input() alertMessage:string;


  constructor(private _homeService: HomeService, private firebaseService: FirebaseService, private router: Router, private fb:FormBuilder) { }

  ngOnInit() {
    this._homeService.currentHome.subscribe(home => this.home = home);

    const phone = this.fb.group({
      area: [],
      prefix: [],
      line: []
    });

    this.myForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z]+')
      ]],
      lastName: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z]+')
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')
      ]]
    });
  }
  
  createUserAccount(){

    let validFields:boolean = this.validateInputFields();
    if(validFields == false){
      return;
    }

    var newUser:IUser = {firstName: this.myForm.value.firstName, lastName: this.myForm.value.lastName,
          phone: this.myForm.value.phone, email: this.myForm.value.email};

    this.firebaseService.createAccount(this.myForm.value.email, this.myForm.value.password)
      .subscribe(
        success => this.successfulCreatedAccount(newUser),
        error => this.alertMessage = error
      );
  }
  
  successfulCreatedAccount(newUser:IUser){
    this.firebaseService.createUserAccount(newUser);
    this.firebaseService.saveUserPropertyData(this.home);
    console.log(this.home);
    this._homeService.updateHomeProperties(this.home);
    console.log(this.TAG);
    console.log("After update home properties");
    console.log(this.home);
    this.router.navigate(['./time-frame']);
  }
  
  validateInputFields():boolean{
    return true;
  }

  /*Reactive Form Methods*/
  get firstName() {
    return this.myForm.get('firstName');
  }

  get lastName() {
    return this.myForm.get('lastName');
  }

  get email() {
    return this.myForm.get('email');
  }

  get phone() {
    return this.myForm.get('phone');
  }

  get password() {
    return this.myForm.get('password');
  }
}
