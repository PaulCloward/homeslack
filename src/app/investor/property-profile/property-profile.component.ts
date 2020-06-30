import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopupService } from '../services/popup.service';
import { PropertyViewService } from '../services/property-view.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-profile',
  templateUrl: './property-profile.component.html',
  styleUrls: ['./property-profile.component.scss']
})
export class PropertyProfileComponent implements OnInit, OnDestroy {

  mProperty:any;
  highestBid:number = 0;
  bidders:number = 0;

  countDownDay:any = '-';
  countDownHour:any = '-';
  countDownMinute:any = '-';
  countDownSecond:any = '-';

  public result: any;
  constructor(public dialogService: PopupService, private mPropertyViewService: PropertyViewService, private mRouter: Router) {}


  ngOnInit() {

    this.countdown();

    setInterval(()=> {
      this.countdown();
    }, 1000);


   this.mPropertyViewService.getViewPropertyData().subscribe(property => {
     if(property != null){
       console.log(property);
       this.mProperty = property;
     }else{
       this.mRouter.navigateByUrl('investor/listings');
     }
   })
  
  } 

  public openDialog() {
    this.dialogService
      .showDialog(this.mProperty)
      .subscribe(res => this.result = res);
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

}
