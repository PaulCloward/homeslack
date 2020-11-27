import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';
import { IInvestorInformation } from '../../model/IInvestorInformation';
import { PropertyDetails } from '../../class/PropertyDetails';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnDestroy {

  @Input() property:PropertyDetails;
 
  mSubscriptionInvestorInformation:Subscription;
  mInvestorInformation:IInvestorInformation;
  mFormBid: FormGroup;
  loading = false;
  success = false;
  mUid:string;

  mEmailPattern:string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  mPhoneNumberPattern:string = "^(\+\d{1,3}[- ]?)?\d{10}$";
  
  constructor(private mFirestoreService: FirestoreService, private mFormBuilder:FormBuilder, private mAuthService: AuthenticationService) {}

  ngOnInit(): void {
    //this.dialogRef.addPanelClass('popup-container');
    

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


    this.mAuthService.getUser().then(user => {

      if(user){

        this.mUid = user.uid;
        if(this.mSubscriptionInvestorInformation){
          this.mSubscriptionInvestorInformation.unsubscribe();
        }
      
        this.mSubscriptionInvestorInformation = this.mFirestoreService.getInvestorInformation(user.uid).subscribe(investorInfo => {
          console.log("investor information: " +  investorInfo);
          this.mInvestorInformation = investorInfo; 
          this.initializeInvestorInformation();
        });
      }
    });
   

  }
  
  initializeInvestorInformation(){
    if(this.mInvestorInformation){
      this.companyName.setValue(this.mInvestorInformation.company_name);
      this.contactName.setValue(this.mInvestorInformation.contact_name);
      this.email.setValue(this.mInvestorInformation.email);
      this.phone.setValue(this.mInvestorInformation.phone);
    }
  }

  ngOnDestroy(){
    if(this.mSubscriptionInvestorInformation){
      this.mSubscriptionInvestorInformation.unsubscribe();
    }
  }

  onClose(){
   
  }
  

  onNoClick(): void {
    
  }

  onReviewBid(){
    this.success = true;
  }

  onPlaceBid(){
    this.mFirestoreService.addPropertyToInvestorOfferMadeList(this.mUid,this.property);
    this.mFirestoreService.deletePropertFromInvestorWatchList(this.mUid, this.property);
    
  }

  get companyName() {
    return this.mFormBid.get('companyName');
  }

  get contactName() {
    return this.mFormBid.get('contactName');
  }

  get phone() {
    return this.mFormBid.get('phone');
  }

  get email() {
    return this.mFormBid.get('email');
  }

  get bid() {
    return this.mFormBid.get('bid');
  }

}