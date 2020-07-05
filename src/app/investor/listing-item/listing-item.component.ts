import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyDetails } from '../../class/PropertyDetails';
import { AuthenticationService } from '../../services/authentication.service';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-listing-item',
  templateUrl: './listing-item.component.html',
  styleUrls: ['./listing-item.component.scss']
})
export class ListingItemComponent implements OnInit {

  readonly watchList:number = 0;
  readonly offersMade:number = 1;
  readonly underContract:number = 2;
  @Input() listingType:number = this.watchList;


  @Input() listing: PropertyDetails;
  @Input() priority: number = 2;
  
  countDownDay:any = "-";
  countDownHour:any = "-";
  countDownMinute:any = "-";
  countDownSecond:any = "-";

  constructor(private mAuthService: AuthenticationService, private mFirestoreService: FirestoreService) { }

  ngOnInit() {

    setInterval(()=> {
      this.countdown();
    }, 1000);
  }

  onClickWatchHeart(){
    event.stopPropagation();
    console.log("Watch heart");
    this.mAuthService.getUser().then(user => {
      this.mFirestoreService.deletePropertFromInvestorWatchList(user.uid, this.listing);    
    });
  }


  public countdown(){
    let now = new Date();
    let eventDate = new Date(2020, 7, 7);

    let currentTime = now.getTime();
    let eventTime = eventDate.getTime();

    let remTime = eventTime - currentTime;

    let s = Math.floor(remTime/1000);
    let m = Math.floor(s / 60);
    let h = Math.floor(m / 60);
    let d = Math.floor(h / 24);

    h %= 24;
    m %= 60;
    s %= 60;

    this.countDownDay = d;
    this.countDownHour = (h < 10) ? "0" + h : h;
    this.countDownMinute = (m < 10) ? "0" + m : m;
    this.countDownSecond = (s < 10) ? "0" + s : s;
  }

 

}
