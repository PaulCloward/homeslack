import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import {TweenMax, Power2, TimelineLite, TimelineMax} from "gsap";

@Component({
  selector: 'app-upload-photos',
  templateUrl: './upload-photos.component.html',
  styleUrls: ['./upload-photos.component.scss'],
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
export class UploadPhotosComponent implements OnInit, OnDestroy {

  isHovering: boolean;
  tl:TimelineMax;

  mFiles: File[] = [];
  mImageList: any[] = [];

  mSubscriptionAuthState:Subscription;
  mSubscriptionHomeImages:Subscription;

  constructor(private mRouter:Router, private mImageService:ImageService, private mAngularFireAuth:AngularFireAuth) { 
    
    if(this.mSubscriptionAuthState){
      this.mSubscriptionAuthState.unsubscribe();
    }

    this.mSubscriptionAuthState = this.mAngularFireAuth.authState.subscribe(user => {
      if(user){

        if(this.mSubscriptionHomeImages){
          this.mSubscriptionHomeImages.unsubscribe();
        }
    
        this.mSubscriptionHomeImages = this.mImageService.getImageDetailList(user.uid).subscribe((images)=> {
            if(images){
              this.mImageList = images;
            }
          }
        );

      }
    });
  }


  ngOnInit() {

    this.tl = new TimelineMax({paused:true});

    this.tl.from("nav", 1, {
      x: 100,
      display: 'none',
      ease: Power2.easeOut,
      delay: 0
  });

  this.tl.to("circle.one", 3, {
      scale: 1,
      x: 0,
      y: -1300,
      ease: Power2.easeOut
  }, "-=1");


  this.tl.to("circle.two", 4, {
      scale: 1.8,
      x: 2900,
      y: -500,
      ease: Power2.easeOut
  }, "-=3");

  }

  ngOnDestroy(){

    if(this.mSubscriptionAuthState){
      this.mSubscriptionAuthState.unsubscribe();
    }

    if(this.mSubscriptionHomeImages){
      this.mSubscriptionHomeImages.unsubscribe();
    }

  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }
  
  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.mFiles.push(files.item(i));
    }
  }

  startUpload(event: any) {
    console.log("Event" + event);
    if (event && event.target && event.target.files) {
      console.log("Event target files" + event.target.files);
      let files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        // this.mFiles.push(files.item(i));
        this.mImageService.uploadImageToStorage(files);
      }
    }
    
  }
  onClickSelectPhotos(){

  }

  clickNextPage(){
    this.mRouter.navigate(['/record-home']);
  }  

  onClickTest(){
    this.tl.play(); 
  }
}
