import { Component, OnInit } from '@angular/core';
import { ISeller } from '../../model/ISeller';
import { Router } from '@angular/router';
import { IHome } from '../../model/IHome';
import { Seller } from '../../class/Seller';
import { FirebaseService } from '../../services/firebase.service';
import { HomeService } from '../../services/home.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-expanded-property',
  templateUrl: './expanded-property.component.html',
  styleUrls: ['./expanded-property.component.css']
})
export class ExpandedPropertyComponent implements OnInit {

  home:any;
  mSeller:ISeller = { first_name: "Paul", last_name: "Placeholder", 'created_account':'?', phone: '?-???-???-????', email: "placeholder@gmail.com" };
  mSeller2:Seller;

  constructor(private mHomeService:HomeService, private mAuth: AngularFireAuth, private firebaseService:FirebaseService) { 
  	this.mHomeService.currentHome.subscribe(home => this.initHome(home));

    
     
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



}
