import { Component, OnInit, OnDestroy } from '@angular/core';
import { PropertyViewService } from '../services/property-view.service';
import { Router } from '@angular/router';
import { PropertyDetails } from '../../class/PropertyDetails';

@Component({
  selector: 'app-property-profile',
  templateUrl: './property-profile.component.html',
  styleUrls: ['./property-profile.component.scss']
})
export class PropertyProfileComponent implements OnInit, OnDestroy {

  mProperty:PropertyDetails;
  highestBid:number = 0;
  bidders:number = 0;

  closingDays:number = 0;
  closingHours:number = 0;
  closingMinutes:number = 0;

  listedDays:number = 0;
  listedHours:number = 0;
  listedMinutes:number = 0;

  countDownDay:any = '-';
  countDownHour:any = '-';
  countDownMinute:any = '-';
  countDownSecond:any = '-';

  propertyBids:number = 0;
  propertyFavored:number = 0;

  public result: any;
  constructor(private mPropertyViewService: PropertyViewService, private mRouter: Router) {}


  ngOnInit() {

    this.countdown();

    setInterval(()=> {
      this.countdown();
    }, 1000);


   this.mPropertyViewService.getViewPropertyData().subscribe(property => {
     if(property != null){
       this.mProperty = property;
     }else{
       this.mRouter.navigateByUrl('investor/market-listings');
     }
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

  ngOnDestroy(){
    
  }

  openNav() {
    document.getElementById("myNav").style.width = "100%";
  }
  
  closeNav() {
    
    document.getElementById("myNav").style.width = "0%";
  }

}
