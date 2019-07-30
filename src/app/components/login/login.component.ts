import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user$ = this.firebaseService.user;

  constructor(private firebaseService: FirebaseService, private router: Router) { 
  	    
  }

  ngOnInit() {
  }

  login(email:string, password:string){
  	this.firebaseService.login(email,password)
  	  .subscribe(
  		success => this.router.navigate(['/home']),
  		error => alert(error)
  		);
  }
}
