import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-upload-photos',
  templateUrl: './upload-photos.component.html',
  styleUrls: ['./upload-photos.component.css'],
  animations: [
    trigger('changeState', [
      state('state1', style({
        backgroundColor: 'green',
        transform: 'scale(1)'
      })),
      state('state2', style({
        backgroundColor: 'red',
        transform: 'scale(1.5)'
      })),
      transition('*=>state1', animate('300ms')),
      transition('*=>state2', animate('4000ms'))
    ]),
    trigger('fadeInOut', [
    transition(':enter', [   // :enter is alias to 'void => *'
      style({opacity:0}),
      animate(1200, style({opacity:1})) 
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
      animate(1, style({opacity:0})) 
    ])
  ])
  ]
})
export class UploadPhotosComponent implements OnInit {

  currentSlideState:number = 0;

  isHovering: boolean;

  files: File[] = [];
  imageList: any[];

  constructor(private mRouter:Router, private mImageService:ImageService) { 
    this.mImageService.getImageDetailList().subscribe(

      images=> {
        console.log(images);
        this.imageList = images;
        // this.rowIndexArray =  Array.from(Array(Math.ceil((this.imageList.length+1) / 3)).keys());
      }
    );
  }

  ngOnInit() {
    setInterval(()=>{
      this.currentSlideState += 1;
      if(this.currentSlideState == 3){
        this.currentSlideState = 0;
      }
    }, 8000);
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  showPreview(event: any) {
    if (event.target.files) {
      let files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        this.files.push(files.item(i));
      }
    }
    
  }


  onClickSelectPhotos(){

  }

  clickNextPage(){
    //console.log(this.home);
    //this._homeService.updateHomeProperties(this.home);
    this.mRouter.navigate(['/confirm-listing']);
  }  
}
