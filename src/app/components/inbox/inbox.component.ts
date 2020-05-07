import { Component, OnInit, Input  } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  name1:string = "Paul Cloward";
  name2:string = "Cole Reasch";
  name3:string = "Grant Barlow";

  name1Selected:boolean = true;
  name2Selected:boolean = false;
  name3Selected:boolean = false;
  selectedArray:boolean[] = [];
  currentSelectedContactIndex:number = 0;
  selectedContactName:string;

  INBOX_SELECTION:number = 1;
  DELETED_SELECTION:number = 2;

  leftPanelSelection:number;

  constructor() { }

  ngOnInit() {
  	this.leftPanelSelection = this.INBOX_SELECTION;
    this.selectedContactName = this.name1;

    this.initRecentMessageSelectedArray();
  }

  initRecentMessageSelectedArray(){
    this.selectedArray.push(this.name1Selected);
    this.selectedArray.push(this.name2Selected);
    this.selectedArray.push(this.name3Selected);
  }

  selectLeftPanelItem(selection:number){

  	if(selection != this.leftPanelSelection){

  		this.unselectLeftPanelItem();
  		if(selection == this.INBOX_SELECTION){
	  		$('#left-panel-inbox').addClass('left-panel-item-selected');
	  	}
	  	else if(selection == this.DELETED_SELECTION){
	  		$('#left-panel-deleted').addClass('left-panel-item-selected');
	  	}

	  	this.leftPanelSelection = selection;
  	}
  }

  selectRecentContact(selectedIndex:number){
    /*console.log(selectedIndex + " " + this.currentSelectedContactIndex);*/
    if(selectedIndex != this.currentSelectedContactIndex){
        this.selectedArray[this.currentSelectedContactIndex] = false;
        this.currentSelectedContactIndex = selectedIndex;
        this.selectedArray[this.currentSelectedContactIndex] = true;
        /*console.log(this.currentSelectedContactIndex + " " + this.selectedArray[this.currentSelectedContactIndex]);*/
    }
    console.log("Paul Selected " + this.name1Selected);
    console.log("Cole Selected " + this.name2Selected);
    console.log("Grant Selected " + this.name3Selected);
    console.log(this.selectedArray)
  }

  unselectLeftPanelItem(){
  	
  	if(this.leftPanelSelection == this.INBOX_SELECTION){
  		$('#left-panel-inbox').removeClass('left-panel-item-selected');
  	}
  	else if(this.leftPanelSelection == this.DELETED_SELECTION){
  		$('#left-panel-deleted').removeClass('left-panel-item-selected');
  	}
  }

  selectedRecentContact(name:string){
    this.selectedContactName = name;
  }



}
