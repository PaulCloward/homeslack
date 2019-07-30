import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-occupancy-status',
  templateUrl: './list-occupancy-status.component.html',
  styleUrls: ['./list-occupancy-status.component.css']
})
export class ListOccupancyStatusComponent implements OnInit {

  realtorProperty:boolean;
  listedWithRealtor:boolean;
  currentlyRentedOut:boolean;
  securityCleaningDeposit:any;
  homeManagedByCompany:boolean;
  date:any;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  isListedWithRealtor(){
  	this.realtorProperty = true;
  }

  isNotListedWithRealtor(){
  	this.realtorProperty = false;
  }

  onClickNext(){
    //console.log(this.home);
    //this._homeService.updateHomeProperties(this.home);
    this.router.navigate(['/image-upload']);
  }

  isPropertyRentedOutNo(){
    console.log("false");
    this.currentlyRentedOut = false;
  }

  isPropertyRentedOutYes(){
    console.log("true");
    this.currentlyRentedOut = true;
  }

  setIsHomeManagedByCompany(managed:boolean){
    this.homeManagedByCompany = managed;
  }
}
