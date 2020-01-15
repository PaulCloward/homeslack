import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
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

  constructor(private mAuth:AngularFireAuth, private authService: FirebaseService, public router: Router) { }

  ngOnInit() {
    this.mAuth.authState.subscribe(
        user => {
          if(user){
           this.isLoggedIn = true;
          } else{
            this.isLoggedIn = false;
          }
        }
      )
  }

  logout(){
    console.log("logout");
    this.authService.logout();
    console.log("Logged In? : " + this.isLoggedIn);
  }
}
