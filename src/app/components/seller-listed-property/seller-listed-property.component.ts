import { Component, OnInit, Input } from '@angular/core';
import { PropertyDetails } from '../../class/PropertyDetails';

@Component({
  selector: 'app-seller-listed-property',
  templateUrl: './seller-listed-property.component.html',
  styleUrls: ['./seller-listed-property.component.scss']
})
export class SellerListedPropertyComponent implements OnInit {

  @Input() mSellerPropertyDetails:PropertyDetails;

  constructor() { }

  ngOnInit() {
  	
  }

}
