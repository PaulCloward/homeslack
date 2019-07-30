import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IHome } from '../../model/IHome';
import { IUser } from '../../model/IUser';
import { FirebaseService } from '../../services/firebase.service';
import { HomeService } from '../../services/home.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-seller-account',
  templateUrl: './seller-account.component.html',
  styleUrls: ['./seller-account.component.css']
})
export class SellerAccountComponent implements OnInit {

  mUser:IUser;
  home:IHome;

  private address:string = "This is the address";

  constructor(public router:Router, public firebaseService: FirebaseService, private mAuth: AngularFireAuth, private mHomeService:HomeService) { 
  }

  ngOnInit() {

    this.mHomeService.currentHome.subscribe(home => this.initHome(home));
    
    this.mAuth.authState.subscribe(user => {
      if(user) {
            this.firebaseService.getUserInfo("/users/" + user.uid + "/contact/").subscribe(
              (success) => this.parseUserObject(success))
            }

           /* this.firebaseService.getHomeListings("/users/" + user.uid + "/home/").map(function (success)
                {this.parseHomeListings(success);}
              )*/
      }
      );
  }

  initHome(home:IHome){
    this.home = home;

    if(this.home.addressInfo.street !== ""){
      console.log("SEARCH FOR HOME WAS FOUND");
    }else{
      console.log("NO HOME FROM SEARCH QUERY FOUND. LOOKING FOR CACHE NOW");
      this.home = this.mHomeService.getLocalStorageProperty();
    }

    JSON.stringify(this.home);
  }

  parseUserObject(user:IUser){
    
    if(user != null){
      console.log("User: " + JSON.stringify(user));
      this.mUser = user;
    }
  }

  parseHomeListings(homes){
    console.log("TESTETESTSET");
     console.log(homes)
  }

  onClickListedProperty(){
    this.mHomeService.updateHomeProperties(this.home);
    this.router.navigate(['./expanded-property']);
  }
}
