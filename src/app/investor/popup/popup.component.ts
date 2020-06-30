import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
 

  mFormBid: FormGroup;
  loading = false;
  success = false;

  mEmailPattern:string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  mPhoneNumberPattern:string = "^(\+\d{1,3}[- ]?)?\d{10}$";
  
  constructor(private mFirestoreService: FirestoreService, private mFormBuilder:FormBuilder, public dialogRef: MatDialogRef<PopupComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
    this.dialogRef.addPanelClass('popup-container');

    this.mFormBid = this.mFormBuilder.group({
      companyName: ['', [
        Validators.required
      ]],
      contactName : ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: ['', [ 
        Validators.required,
        // ValidationPhoneNumber.checkLimit(9,11),
        Validators.pattern("^[0-9]+$")
      ]],
      bid: ['', [
        Validators.required
      ]]
    });
  }

  onClose(){
    this.dialogRef.close();
  }
  

  onNoClick(): void {
    this.dialogRef.close();
  }

  onReviewBid(){
    this.success = true;
  }

  onPlaceBid(){
    //this.mFirestoreService.addPropertyToInvestorOfferMadeList( ,)
    this.dialogRef.close();
  }

  get companyName() {
    return this.mFormBid.get('companyName');
  }

  get contactName() {
    return this.mFormBid.get('contactName');
  }

  get bid() {
    return this.mFormBid.get('bid');
  }

  get phone() {
    return this.mFormBid.get('phone');
  }

  get email() {
    return this.mFormBid.get('email');
  }

}