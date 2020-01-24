import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   public isLoggedIn:boolean;
   model:any;

  constructor(private mAuth:AngularFireAuth, public mRouter: Router) { }

  ngOnInit() {
    this.mAuth.authState.subscribe(user => {
          if(user){
           this.isLoggedIn = true;
          } else{
            this.isLoggedIn = false;
          }
        }
      )
  }

  logout(){
    this.mAuth.auth.signOut().then(() => {
      this.mRouter.navigateByUrl('home');
    })
    .catch(error => {
      console.log("Sign Out Failed " + error);
    })
  }
}
