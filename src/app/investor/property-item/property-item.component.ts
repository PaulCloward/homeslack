import { Component, OnInit, Input } from '@angular/core';
import { PropertyDetails } from '../../class/PropertyDetails';
import { PropertyViewService } from '../services/property-view.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.scss']
})
export class PropertyItemComponent implements OnInit {

  @Input() listing: PropertyDetails;

  pathPropertyImage:string = "../../../assets/img/home_list_example.png";

  isHeartSelected:number = -1;
  
  icHeartPathUnselected:string = '../../../assets/img/ic_heart_gray.png';
  icHeartPathSelected:string = '../../../assets/img/ic_heart_red.png';

  countDownDay:any = "-";
  countDownHour:any = "-";
  countDownMinute:any = "-";
  countDownSecond:any = "-";

  constructor(private mAuthService: AuthenticationService, private mPropertyViewService: PropertyViewService, private mRouter: Router, private mFirestoreService: FirestoreService) { }

  ngOnInit() {

    this.mPropertyViewService.getWatchListAddresses().subscribe(addresses => {
      if(addresses == null || !addresses.includes(this.listing.address.street)){
        this.isHeartSelected = 0;
      }else {
        this.isHeartSelected = 1;
      }
    })

    setInterval(()=> {
      this.countdown();
    }, 1000);
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

  onClickHeart(){
   if(this.isHeartSelected == 0){
    this.mAuthService.getUser().then(user => {
      this.mFirestoreService.addPropertyToInvestorWatchList(user.uid, this.listing);    
    });
    }else if(this.isHeartSelected == 1){
      this.mAuthService.getUser().then(user => {
        this.mFirestoreService.deletePropertFromInvestorWatchList(user.uid, this.listing);    
      });
    }
    
  }

  onPropertyClick(property:any){
    this.mPropertyViewService.updateViewPropertyData(property);
    this.mRouter.navigateByUrl('investor/property-profile');
  }

}
