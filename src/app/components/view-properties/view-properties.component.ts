import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-properties',
  templateUrl: './view-properties.component.html',
  styleUrls: ['./view-properties.component.scss']
})
export class ViewPropertiesComponent implements OnInit {

  temp:number = 5000;
  constructor() { }

  ngOnInit() {
  }
  
  changeZoom(value: number) {
    this.temp = value;
  }

}
