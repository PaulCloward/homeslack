import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listing-item',
  templateUrl: './listing-item.component.html',
  styleUrls: ['./listing-item.component.scss']
})
export class ListingItemComponent implements OnInit {

  @Input() priority: number = 2; 

  constructor() { }

  ngOnInit() {
  }

}
