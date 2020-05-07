import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
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
export class NavbarComponent implements OnInit, OnDestroy {

   isLoggedIn:boolean;
   mSubscriptionAuth:Subscription;

  constructor(private mAuth:AngularFireAuth, public mRouter: Router) { }

  ngOnInit() {

    if(this.mSubscriptionAuth != null){
      this.mSubscriptionAuth.unsubscribe();
    }

    this.mSubscriptionAuth =this.mAuth.authState.subscribe(user => {
          if(user){
           this.isLoggedIn = true;
           console.log("logged in");
          } else{
            this.isLoggedIn = false;
            console.log("Not logged in");
          }
        }
      )
  }

  ngOnDestroy(){
    if(this.mSubscriptionAuth != null){
      this.mSubscriptionAuth.unsubscribe();
    }
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
