import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inbox-message',
  templateUrl: './inbox-message.component.html',
  styleUrls: ['./inbox-message.component.css']
})
export class InboxMessageComponent implements OnInit {

  @Input() name: string;
  @Input() selected: boolean = false;

  constructor() { }

  ngOnInit() {
  	
  }

}
