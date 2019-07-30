import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { FirebaseService } from '../../services/firebase.service';
import { IHome } from '../../model/IHome';
import { ITimeframe } from '../../model/ITimeframe';
import { NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date'

declare var $: any;

@Component({
  selector: 'app-time-frame',
  templateUrl: './time-frame.component.html',
  styleUrls: ['./time-frame.component.css']
})
export class TimeFrameComponent implements OnInit {

  home:IHome;
  isOutByClosing:string = 'yes';
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  model:any;
  date:any;

  realtorProperty:boolean;
  listedWithRealtor:boolean;

  propertyVacant:number = 0;

  currentlyRentedOut:boolean;
  securityCleaningDeposit:any;
  homeManagedByCompany:string; 

  constructor(private mHomeService: HomeService, private mFirebaseService: FirebaseService, private router:Router, calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }
  
  ngOnInit() {
    this.mHomeService.currentHome.subscribe(home => {
          this.home = home;
        }
      );
  }

  isListedWithRealtor(){
    this.realtorProperty = true;
    this.home.timeframeInfo.listWithRealtor = true;
  }

  isNotListedWithRealtor(){
    this.realtorProperty = false;
    this.home.timeframeInfo.listWithRealtor = false;
  }

  onClickNext(){
    this.mHomeService.updateHomeProperties(this.home);
    this.mFirebaseService.updateSavedUserPropertyData(this.home);
  	this.router.navigate(['/image-upload']);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }
}
