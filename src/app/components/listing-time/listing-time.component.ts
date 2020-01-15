import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { FirebaseService } from '../../services/firebase.service';
import { IHome } from '../../model/IHome';
import { NgbCalendar, NgbDateStruct, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-listing-time',
  templateUrl: './listing-time.component.html',
  styleUrls: ['./listing-time.component.css'],
  animations: [
    trigger('changeState', [
      state('state1', style({
        backgroundColor: 'green',
        transform: 'scale(1)'
      })),
      state('state2', style({
        backgroundColor: 'red',
        transform: 'scale(1.5)'
      })),
      transition('*=>state1', animate('300ms')),
      transition('*=>state2', animate('4000ms'))
    ]),
    trigger('fadeInOut', [
    transition(':enter', [   // :enter is alias to 'void => *'
      style({opacity:0}),
      animate(600, style({opacity:1})) 
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
      animate(1000, style({opacity:0})) 
    ])
  ])
  ]
})
export class ListingTimeComponent implements OnInit {

  home:IHome;

  //step 1
  readonly homeDescriptionPropertyIsVacant:number = 0;
  readonly homeDescriptionPropertyIsOwnerOccupied:number = 1;
  readonly homeDescriptionPropertyIsTenantOccupied:number = 2;
  selectedHomeDescription:number;

  
  isPropertyListedWithRealtor:boolean;
  isOutByClosing:boolean;
  payRealtorFeesEndorsement:string;
  removePersonalItemsAgreementEndorsement:string;
  removePersonalItemsByMoveoutAgreementEndorsement:string;
  authorizationEndorsement:string;
  escrowHoldbackFeeAgreementEndorsement:string;
  everythingConfirmedEndorsement:string;

  /*-- homeDescriptionPropertyIsTenantOccupied selected preceding properties  --*/
  isPropertyManagerInPlace:boolean;
  isTenantMonthToMonth:boolean;
  selectedPropertyMangagerAgreementExpirationDate:NgbDate;
  selectedTenantRentalAgreementDate:NgbDate;
  tenantRentalAgreementStartDate:NgbDate;
  tenantRentalAgreementEndDate:NgbDate;
  isThereSecurityDeposit:boolean;
  securityDepositAmount:string;
  preferredClosingTenantOccupiedStartDate:NgbDate;
  preferredClosingTenantOccupiedEndDate: NgbDateStruct;
  reviewOfferTenantOccupiedStartDate: NgbDateStruct;
  reviewOfferTenantOccupiedEndDate: NgbDateStruct;
  selectedPreferredClosingTenantOccupiedDate:NgbDate;
  selectedReviewOfferTenantOccupiedDate:NgbDate;
  tenantObligatedToPayAmount:string;
  propertyMangagerAgreementExpirationStartDate: NgbDateStruct;
  propertyMangagerAgreementExpirationEndDate: NgbDateStruct;

  hoveredDate: NgbDate;
  currentDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  selectedPreferredClosingDate:NgbDate;
  selectedPreferredMoveOutDate:NgbDate;
  selectedReviewOfferDate:NgbDate;
  date:any;
  date1:any;
  date2:any;

  selectedPreferredMoveOutMonthCalendarAmount:number = 2;

  preferredClosingStartDate:NgbDateStruct;
  preferredMovingStartDate: NgbDateStruct;
  reviewOfferStartDate: NgbDateStruct;
  


  preferredClosingEndDate: NgbDateStruct;
  preferredMovingEndDate: NgbDateStruct;
  reviewOfferEndDate: NgbDateStruct;

  exampleDate:NgbDate;

  disabled:boolean = true;
  
  constructor(private mHomeService: HomeService, private mFirebaseService: FirebaseService, private router:Router, private mCalendar: NgbCalendar) {

   }

  ngOnInit() {

    this.currentDate = this.mCalendar.getToday();
    this.preferredClosingStartDate = this.mCalendar.getNext(this.mCalendar.getToday(), 'd', 14);
    this.preferredClosingTenantOccupiedStartDate = this.mCalendar.getNext(this.mCalendar.getToday(), 'd', 14);
    this.propertyMangagerAgreementExpirationStartDate = this.mCalendar.getToday();
    

    this.reviewOfferStartDate = this.mCalendar.getToday();
    this.reviewOfferTenantOccupiedStartDate = this.mCalendar.getToday();
    this.preferredMovingStartDate = this.mCalendar.getToday();

    this.tenantRentalAgreementStartDate = this.mCalendar.getToday();
  
    this.mHomeService.currentHome.subscribe(home => {
        this.home = home;
      }
    );
  }

  onKeyDown(event: any) {
    
    const pattern = /^[a-zA-Z]+$/;
    let inputChar = event.key;

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
}

  nullifyAllTimeFrameAttributes(){
    this.isPropertyListedWithRealtor = null;
    this.payRealtorFeesEndorsement = null;
    this.selectedPreferredClosingDate = null;
    this.selectedPreferredMoveOutDate = null;
    this.selectedReviewOfferDate = null;
    this.isOutByClosing = null;
    this.removePersonalItemsAgreementEndorsement = null;
    this.removePersonalItemsByMoveoutAgreementEndorsement = null;
    this.authorizationEndorsement= null;
    this.escrowHoldbackFeeAgreementEndorsement = null;

    this.isPropertyManagerInPlace = null;
    this.isTenantMonthToMonth = null;
    this.selectedPropertyMangagerAgreementExpirationDate = null;
    this.selectedTenantRentalAgreementDate = null;
    this.isTenantMonthToMonth = null;
    this.isThereSecurityDeposit = null;
    this.securityDepositAmount = null;
    this.selectedPreferredClosingTenantOccupiedDate = null;
    this.selectedReviewOfferTenantOccupiedDate = null;
    this.tenantObligatedToPayAmount = null;
  }

  onClickHomeDescription(option:number){
    this.selectedHomeDescription = option;
    this.nullifyAllTimeFrameAttributes();
  }

  onClickIsPropertyListedWithRealtor(){
  
    this.payRealtorFeesEndorsement = null;
    this.selectedPreferredClosingDate = null;
    this.selectedPreferredMoveOutDate = null;
    this.selectedReviewOfferDate = null;
    this.isOutByClosing = null;
    this.removePersonalItemsAgreementEndorsement = null;
    this.removePersonalItemsByMoveoutAgreementEndorsement = null;
    this.authorizationEndorsement= null;
    this.escrowHoldbackFeeAgreementEndorsement = null;
  
    this.isPropertyManagerInPlace = null;
    this.isTenantMonthToMonth = null;
    this.selectedPropertyMangagerAgreementExpirationDate = null;
    this.selectedTenantRentalAgreementDate = null;
    this.isThereSecurityDeposit = null;
    this.securityDepositAmount = null;
    this.selectedPreferredClosingTenantOccupiedDate = null;
    this.selectedReviewOfferTenantOccupiedDate = null;
    this.tenantObligatedToPayAmount = null;
  }

  onClickIsTenantMonthToMonth(){
    this.selectedTenantRentalAgreementDate = null;
    this.isThereSecurityDeposit = null;
    this.securityDepositAmount = null;
    this.tenantObligatedToPayAmount = null;
    this.selectedPreferredClosingTenantOccupiedDate =null;
    this.selectedReviewOfferTenantOccupiedDate = null;
  }

  onClickIsThereSecurityDeposit(){
    this.selectedPreferredClosingDate = null;
    this.securityDepositAmount = null;
    this.selectedPreferredClosingTenantOccupiedDate =null;
    this.selectedReviewOfferTenantOccupiedDate = null;
  }

  onClickIsPropertyManagerInPlace(){
    this.selectedPropertyMangagerAgreementExpirationDate = null;
    this.selectedTenantRentalAgreementDate = null;
    this.isTenantMonthToMonth = null;
    this.isThereSecurityDeposit = null;
    this.securityDepositAmount = null;
    this.selectedReviewOfferTenantOccupiedDate = null;
  }

  onClickIsOutByClosing(){
    this.removePersonalItemsAgreementEndorsement = null;
    this.selectedPreferredMoveOutDate = null;
    this.selectedReviewOfferDate = null;
    this.removePersonalItemsByMoveoutAgreementEndorsement = null;
    this.escrowHoldbackFeeAgreementEndorsement = null;
  }

  onClickNext(){
    this.mHomeService.updateHomeProperties(this.home);
    //TODO
    //this.mFirebaseService.updateSavedUserPropertyData(this.home);
  	this.router.navigate(['/upload-photos']);
  }

  onPropertyMangagerAgreementExpirationDateSelection(date:NgbDate){
    this.selectedPropertyMangagerAgreementExpirationDate = date;
    this.isTenantMonthToMonth = null;
    this.selectedTenantRentalAgreementDate = null;
    this.isThereSecurityDeposit = null;
    this.securityDepositAmount = null;
    
  }

  onTenantRentalAgreementDateSelection(date:NgbDate){
    this.selectedTenantRentalAgreementDate = date;
    this.isThereSecurityDeposit = null;
    this.securityDepositAmount = null;
  }

  onPreferredClosingDateSelection(date:NgbDate){
    
    this.selectedReviewOfferDate = null;
    this.selectedPreferredMoveOutDate = null;

    this.disabled = false;

    this.determinePreferredMovingDates(date);
    this.determineReviewOfferEndDate(date);

    this.removePersonalItemsAgreementEndorsement = null;
    this.authorizationEndorsement = null;
  }

  onPreferredClosingDateTenantOccupiedSelection(date:NgbDate){
    this.selectedReviewOfferTenantOccupiedDate = null;
    this.determineReviewOfferTenantOccupiedEndDate(date);
  }

  determinePreferredMovingDates(date){
      setTimeout(()=> {
        this.preferredMovingStartDate = {year: date.year, month: date.month, day: date.day}; 
      }, 1000);
      this.preferredMovingEndDate = this.mCalendar.getNext(date, 'd', 21);
  }

  determineReviewOfferEndDate(closingDate:NgbDate){
    this.reviewOfferEndDate = this.mCalendar.getPrev(closingDate, 'd', 8);
  }

  determineReviewOfferTenantOccupiedEndDate(closingDate:NgbDate){
    this.reviewOfferTenantOccupiedEndDate = this.mCalendar.getPrev(closingDate, 'd', 8);
  }

  onPreferredMovingDateSelection(date: NgbDate){
    this.selectedPreferredMoveOutDate = date;
  }

  onReviewOfferDateSelection(date: NgbDate){
    this.selectedReviewOfferDate = date;
    this.authorizationEndorsement = null;
  }

  onReviewOfferTenantOccupiedDateSelection(date: NgbDate){
    this.selectedReviewOfferTenantOccupiedDate = date;
  }

  navigateToClosingDate(date: NgbDate){
    
  }


  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  //isDisabled = (date: NgbDate, current: {month: number}) => date.month !== current.month;
  isWeekend = (date: NgbDate) =>  this.mCalendar.getWeekday(date) >= 6;
  markDisabled(date: NgbDate, current: {month: number}) {
    return (this.isWeekend(date));
  }

  isHoliday(date: NgbDate): string {
    const holiday = this.holidays.find(h => h.day === date.day && h.month === date.month);
    return holiday ? holiday.text : '';
  }

  holidays: {month, day, text}[] = [
    {month: 1, day: 1, text: 'New Years Day'},
    {month: 3, day: 30, text: 'Good Friday (hi, Alsace!)'},
    {month: 5, day: 1, text: 'Labour Day'},
    {month: 5, day: 5, text: 'V-E Day'},
    {month: 7, day: 14, text: 'Bastille Day'},
    {month: 8, day: 15, text: 'Assumption Day'},
    {month: 11, day: 1, text: 'All Saints Day'},
    {month: 11, day: 11, text: 'Armistice Day'},
    {month: 12, day: 25, text: 'Christmas Day'}
  ];

  disabledDates: NgbDateStruct[] = [ 
    {year: 2019, month:9, day:10},
    {year: 2019, month:9, day:12},
    {year: 2019, month:9, day:14},
  ]

  isNotIncluded(date: NgbDate){
    return date.after(this.currentDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

}
