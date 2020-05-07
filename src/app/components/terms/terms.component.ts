import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  constructor(private mRouter:Router) { }

  ngOnInit() {
  }

  onBack(){
    this.mRouter.navigate(['/create-account']);
  }

}
