import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

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
export class UploadPhotosComponent implements OnInit, OnDestroy {

  isHovering: boolean;

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

      }else{
        this.mRouter.navigateByUrl('login');
      }
    });
  }

  ngOnInit() {
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

  showPreview(event: any) {
    if (event && event.target && event.target.files) {
      let files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        this.mFiles.push(files.item(i));
      }
    }
    
  }

  onFindPhoto(event){
    console.log("button clicked");
  }


  onClickSelectPhotos(){

  }

  clickNextPage(){
    //console.log(this.home);
    //this._homeService.updateHomeProperties(this.home);
    this.mRouter.navigate(['/confirm-listing']);
  }  
}
