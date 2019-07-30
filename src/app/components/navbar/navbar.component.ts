import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

   public isLoggedIn:boolean;
   model:any;

  constructor(private authService: FirebaseService, public router: Router) { }

  ngOnInit() {
    this.authService.isAuthenticated()
      .subscribe(
          success => this.isLoggedFunction(success)
        );
  }

  logout(){
    console.log("logout");
    this.authService.logout();
    console.log("Logged In? : " + this.isLoggedIn);
  }
  
  isLoggedFunction(test:boolean){
    console.log("Log out function. Is Logged: " + test);
    this.isLoggedIn = test;
  }
 


}
