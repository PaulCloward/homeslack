import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  // name:string = '';
  // email:string = '';
  // message:string = '';
  isSubmitted:boolean = false;
  tipMessage:string = "Need a name, correctly formatted email, and a message with at least 50 characters before sending";
  errorStatement:string = "";
  myFormContact: FormGroup;

  constructor(private mFormBuilder:FormBuilder) { }

  ngOnInit() {
    this.myFormContact = this.mFormBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      name: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/)
      ]],
      message: ['', [
        Validators.required,
        Validators.minLength(50)
      ]]
    });
  }

  get email() {
    return this.myFormContact.get('email');
  }

  get name() {
    return this.myFormContact.get('name');
  }

  get message() {
    return this.myFormContact.get('message');
  }

  onSubmit(){
    this.myFormContact.setValue({"message":""});
    this.isSubmitted = true;
  }

}
