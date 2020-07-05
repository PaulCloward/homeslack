import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar-shell',
  templateUrl: './navbar-shell.component.html',
  styleUrls: ['./navbar-shell.component.scss']
})
export class NavbarShellComponent implements OnInit {

  
selector(s){
  return document.querySelector<HTMLInputElement>(s);
}

  constructor(public mRouter:Router, private mAuth:AngularFireAuth) { }

  ngOnInit() {
    //document.getElementById('my-row').querySelector<HTMLInputElement>('.myClass').value
    if(!this.isRouteInvestor()){
      document.querySelector<HTMLInputElement>(".menu").addEventListener('click', function (){
          this.classList.toggle('open');
          document.querySelector<HTMLInputElement>('header').classList.toggle('open');
          document.querySelector<HTMLInputElement>('.overlay').classList.toggle('open');
      });
    }
  }

  onSignOut(){
    this.mAuth.auth.signOut().then(()=> {
      this.mRouter.navigateByUrl('home');
    })
    .catch(error => {
      console.log("Not able to sign out: " + error);
    });
  }

  onSignIn(userType:string){
    if(userType == 'investor'){
      this.mRouter.navigateByUrl('login', {state: {data: {route: 'investor'}}});
    }else {
      this.mRouter.navigateByUrl('login', {state: {data: {route: 'seller'}}});
    }
  }

  isNavDirectory(){
    return this.mRouter.url == '/directory';
  }

  isNavWhyUs(){
    return this.mRouter.url == '/why-us';
  }

  isNavContact(){
    return this.mRouter.url == '/contact';
  }

  
  isRouteInvestor(){
    return this.mRouter.url == '/investor' ||  this.mRouter.url == '/investor/browse-listings' ||  this.mRouter.url == '/investor/market-listings' ||
     this.mRouter.url == '/investor/listings' ||  this.mRouter.url == '/investor/property-profile';
  }

  isRouteMarketListing(){
    return this.mRouter.url == '/investor/market-listings';
  }




}
