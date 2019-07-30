import { Component, OnInit } from '@angular/core';
import { IUser } from '../../model/IUser';
import { Router } from '@angular/router';
import { IHome } from '../../model/IHome';
import { FirebaseService } from '../../services/firebase.service';
import { HomeService } from '../../services/home.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-expanded-property',
  templateUrl: './expanded-property.component.html',
  styleUrls: ['./expanded-property.component.css']
})
export class ExpandedPropertyComponent implements OnInit {

  home:any;
  mUser:IUser;

  constructor(private mHomeService:HomeService, private mAuth: AngularFireAuth, private firebaseService:FirebaseService) { 
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

  ngOnInit() {
  	
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


}
