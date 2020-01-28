import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  //@Input() backgroundColor:string = "#f1f1f1";
  //@Input() backgroundColor:string = "#13335A";
  @Input() backgroundColor:string = "#04A3C8";
  
  constructor() { }

  ngOnInit() {
  }

}
