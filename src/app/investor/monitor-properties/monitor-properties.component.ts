
  import { Component, OnInit, Input } from '@angular/core';
  import { AuthenticationService } from '../../services/authentication.service';
  import { FirestoreService } from '../../services/firestore.service';
  import { PropertyDetails } from '../../class/PropertyDetails';
  import { Router } from '@angular/router';
  import { PropertyViewService } from '../services/property-view.service';
@Component({
  selector: 'app-monitor-properties',
  templateUrl: './monitor-properties.component.html',
  styleUrls: ['./monitor-properties.component.scss']
})
export class MonitorPropertiesComponent implements OnInit {
  
  priority1:number = 1;
  user:any;

  mWatchList:PropertyDetails[];

  mInvestorInformation:any;


  constructor(private mAuthService: AuthenticationService, private mFirestoreService: FirestoreService, private mRouter: Router, private mPropertyViewService: PropertyViewService) { }

  ngOnInit() {
    this.mAuthService.getUser().then(user => {
      user = user;

      if(user){
        this.mFirestoreService.getInvestorWatchList(user.uid).subscribe(watchList => {
          console.log("watchlist: " +  watchList);
          this.mWatchList = watchList.watch_list; 
        });

        this.mFirestoreService.getInvestorInformation(user.uid).subscribe(investorInfo => {
          console.log("investor information: " +  investorInfo);
          this.mInvestorInformation = investorInfo; 
        });
      }
    });
  }

  onPropertyClick(property:any){
    this.mPropertyViewService.updateViewPropertyData(property);
    this.mRouter.navigateByUrl('investor/property-profile');
  }

}
