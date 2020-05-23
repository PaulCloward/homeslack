import { Component, OnInit, OnDestroy} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {

  mSubscriptionAuth:Subscription;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public mRouter:Router, private mAuth:AngularFireAuth, private mFirestoreService:FirestoreService) {}

  ngOnInit():void{
    if(this.mSubscriptionAuth){
      this.mSubscriptionAuth.unsubscribe();
    }

    this.mSubscriptionAuth = this.mAuth.authState.subscribe(user => {
      if(user){
       
      }
    });
  }

  ngOnDestroy():void{
    if(this.mSubscriptionAuth){
      this.mSubscriptionAuth.unsubscribe();
    }
  }

  getRoute(){
    return this.mRouter.url;
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

  isNavLogin(){
    return this.mRouter.url == '/login';
  }

  onSignOut(){
    this.mAuth.auth.signOut().then(()=> {
      this.mRouter.navigateByUrl('home');
    })
    .catch(error => {
      console.log("Not able to sign out: " + error);
    });
  }
}