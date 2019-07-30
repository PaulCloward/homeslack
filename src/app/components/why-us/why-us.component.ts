import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-why-us',
  templateUrl: './why-us.component.html',
  styleUrls: ['./why-us.component.css']
})
export class WhyUsComponent implements OnInit {

  currentViewMoreOpen:number = -1;

  viewMoreClicked1:boolean = false;
  viewMoreClicked2:boolean = false;
  viewMoreClicked3:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleContainer1(){
      
      if(this.currentViewMoreOpen == 1){
         $("#container-1").slideUp();
         this.viewMoreClicked1 = false;
         this.currentViewMoreOpen = -1;
       } else{
         this.closeViewMore();
         this.currentViewMoreOpen = 1;
         this.openViewMore();
       }
    }
    
    toggleContainer2(){
      if(this.currentViewMoreOpen == 2){
         $("#container-2").slideUp();
         this.viewMoreClicked2 = false;
         this.currentViewMoreOpen = -1;
       }else{
         this.closeViewMore();
         this.currentViewMoreOpen = 2;
         this.openViewMore();
       }
    }

    toggleContainer3(){
      if(this.currentViewMoreOpen == 3){
         $("#container-3").slideUp();
         this.viewMoreClicked3 = false;
         this.currentViewMoreOpen = -1;
       }else{
         this.closeViewMore();
         this.currentViewMoreOpen = 3;
         this.openViewMore();
       }
    }

    closeViewMore(){
       if(this.currentViewMoreOpen == 1){
          $("#container-1").slideUp();
          this.viewMoreClicked1 = false;
       } else if(this.currentViewMoreOpen == 2){
          $("#container-2").slideUp();
          this.viewMoreClicked2 = false;
       } else if(this.currentViewMoreOpen == 3){
          $("#container-3").slideUp();
          this.viewMoreClicked3 = false;
       } 
    }

    openViewMore(){
       if(this.currentViewMoreOpen == 1){
          $("#container-1").slideDown();
          this.viewMoreClicked1 = true;
       } else if(this.currentViewMoreOpen == 2){
          $("#container-2").slideDown();
          this.viewMoreClicked2 = true;
       } else if(this.currentViewMoreOpen == 3){
          $("#container-3").slideDown();
          this.viewMoreClicked3 = true;
       } 
    }

}
