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

  closingDistance:number;
  closingDays:number;
  closingHours:number;
  closingMinutes:number;
  closingSeconds:number;
  listedDistance:number;
  listedDays:number;
  listedHours:number;
  listedMinutes:number;
  listedSeconds:number;

  countDownDay:any = '-';
  countDownHour:any = '-';
  countDownMinute:any = '-';
  countDownSecond:any = '-';

  propertyBids:number = 0;
  propertyFavored:number = 0;

  public result: any;


  closingCountdownDate = new Date("december 25, 2020 12:00:01").getTime();

  closingInterval = setInterval(() => {
    var now = new Date().getTime();
    this.closingDistance = this.closingCountdownDate - now;
    this.closingDays = Math.floor(this.closingDistance/(1000*60*60*24));
    this.closingHours = Math.floor((this.closingDistance % (1000*60*60*24)) / (1000*60*60));
    this.closingMinutes = Math.floor((this.closingDistance % (1000*60*60)) / (1000*60));
    this.closingSeconds = Math.floor((this.closingDistance % (1000*60)) / 1000);
    if(this.closingDistance < 0){
      clearInterval(this.closingInterval);
    }
  });

  listedCountdownDate = new Date("february 13, 2021 17:25:59").getTime();
  
  listingInterval = setInterval(() => {
    var now = new Date().getTime();
    this.listedDistance = this.listedCountdownDate - now;
    this.listedDays = Math.floor(this.listedDistance/(1000*60*60*24));
    this.listedHours = Math.floor((this.listedDistance % (1000*60*60*24)) / (1000*60*60));
    this.listedMinutes = Math.floor((this.listedDistance % (1000*60*60)) / (1000*60));
    this.listedSeconds = Math.floor((this.listedDistance % (1000*60)) / 1000);
    if(this.listedDistance < 0){
      clearInterval(this.listingInterval);
    }
  });


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
