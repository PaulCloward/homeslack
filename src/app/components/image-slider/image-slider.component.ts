import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { PropertyImage } from '../../class/PropertyImage';
@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.scss'],
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
      animate(600, style({opacity:1})) 
    ]),
    transition(':leave', [   // :leave is alias to '* => void'
      animate(1000, style({opacity:0})) 
    ])
  ])
  ]
})
export class ImageSliderComponent implements OnInit {

  @Input() images:any[] = [];
  mImageHovered:number = -1;
  mPhotoInEditMode = -1;

  constructor() { }

  ngOnInit() {
  }

  onThumbnailHover(imageHovered: number){
    this.mImageHovered = imageHovered;
  }

  onEditPhoto(index:number){
    this.mPhotoInEditMode = index;
    this.onThumbnailHover(-1);
  }

  onCancelEditPhoto(image:PropertyImage){
    if(image.description){
      image.description = "";
    }
    if(image.note){
      image.note = "";
    }
    this.mPhotoInEditMode = -1;
  }

  onSaveEditOfPhoto(image:PropertyImage){
    image.description = "Bathroom";
    //save additions to firebase

    this.mPhotoInEditMode = -1;
  }

  onClickPhotoDescription(image:PropertyImage,pictureDescription:string){
    image.description = pictureDescription;
  }

}
