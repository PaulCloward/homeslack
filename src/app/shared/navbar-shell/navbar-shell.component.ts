import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from '../../services/firestore.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar-shell',
  templateUrl: './navbar-shell.component.html',
  styleUrls: ['./navbar-shell.component.scss']
})
export class NavbarShellComponent implements OnInit, OnDestroy {

  mSubscriptionAuth:Subscription;
  mSubscriptionUserRoles:Subscription;
  mRole:String = null;
  
  selector(s){
    return document.querySelector<HTMLInputElement>(s);
  }

  constructor(public mRouter:Router, private mAuth:AngularFireAuth, private mFirestoreService: FirestoreService) { }

  ngOnInit() {
    //document.getElementById('my-row').querySelector<HTMLInputElement>('.myClass').value
    if(!this.isRouteInvestor()){
      document.querySelector<HTMLInputElement>(".menu").addEventListener('click', function (){
          this.classList.toggle('open');
          document.querySelector<HTMLInputElement>('header').classList.toggle('open');
          document.querySelector<HTMLInputElement>('.overlay').classList.toggle('open');
      });
    }

    if(this.mSubscriptionAuth){
      this.mSubscriptionAuth.unsubscribe();
    }

    this.mSubscriptionAuth = this.mAuth.authState.subscribe(user => {
     if(user){
      this.getUserRoles(user.uid);
     }
    });

  }

  ngOnDestroy():void{
    if(this.mSubscriptionUserRoles){
      this.mSubscriptionUserRoles.unsubscribe();
    }

    if(this.mSubscriptionAuth){
      this.mSubscriptionAuth.unsubscribe();
    }
  }

  getUserRoles(uuid:string){

    if(this.mSubscriptionUserRoles){
      this.mSubscriptionAuth.unsubscribe();
    }

    this.mFirestoreService.getUserRoles(uuid).subscribe(userRoles => {
      
      if(userRoles == null){
        this.mRole = null;
        return;
      }

      if(userRoles.role.seller == true){
        this.mRole = 'seller';
        this.mRouter.navigateByUrl('seller');
      }else if(userRoles.role.investor == true){
        this.mRole = 'investor';
        this.mRouter.navigateByUrl('investor/property-profile');
      }else if(userRoles.role.admin == true){
        this.mRole = 'admin';
      }else{
        this.mRole = null;
      }
    });
  }

  onSignOut(){
    this.mAuth.auth.signOut().then(()=> {
      this.mRouter.navigateByUrl('home');
      this.mRole = null;
    })
    .catch(error => {
      console.log("Not able to sign out: " + error);
    });
  }

  onSignIn(userType:string){

    
    if(userType == 'investor'){
      this.mRouter.navigateByUrl('authentication/investor-login');
    }else {
      this.mRouter.navigateByUrl('authentication/seller-login');
    }
  }

  isNavDirectory(){
    return this.mRouter.url == '/directory';
  }

  isNavWhyUs(){
    return this.mRouter.url == '/why-us' || this.mRouter.url == '/why-us/why-us';
  }

  isNavContact(){
    return this.mRouter.url == '/contact';
  }

  
  isRouteInvestor(){
    return this.mRouter.url == '/investor' ||  this.mRouter.url == '/investor/monitor-listings' ||  this.mRouter.url == '/investor/market-listings' ||
      this.mRouter.url == '/investor/property-profile';
  }

  isRouteInvestorProfile(){
    return this.mRouter.url == '/investor';
  }

  isRouteMarketListing(){
    return this.mRouter.url == '/investor/market-listings';
  }

  isRoutePropertyProfile(){
    return this.mRouter.url == '/investor/property-profile';
  }

  isRouteHome(){
    return this.mRouter.url == '/' || this.mRouter.url == '/home';
  }

  isRouteSellerProfile(){
    return this.mRouter.url == '/seller' ||  this.mRouter.url == '/seller/seller-profile';
  }

  isRouteSignIn(){
    return this.mRouter.url == '/authentication/seller-login' ||  this.mRouter.url == '/authentication/investor-login';
  }

  isNavNewDirectory(){
    return this.mRouter.url == '/directory-new' || this.mRouter.url == '/directory-new/directory-new';
  }
}
