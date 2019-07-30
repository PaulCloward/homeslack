import { Component, OnInit, Input } from '@angular/core';
import { IHome } from '../../model/IHome';

@Component({
  selector: 'app-seller-listed-property',
  templateUrl: './seller-listed-property.component.html',
  styleUrls: ['./seller-listed-property.component.css']
})
export class SellerListedPropertyComponent implements OnInit {

  @Input() home:IHome;

  constructor() { }

  ngOnInit() {
  	console.log("LISTED PROPERTY: " + JSON.stringify(this.home));
  }

}
