import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadPhotosRoutingModule } from './upload-photos-routing.module';
import { UploadPhotosComponent } from './upload-photos/upload-photos.component';
import { SharedModule } from '../shared/shared.module';
import { UploadTaskComponent } from './upload-task/upload-task.component';


@NgModule({
  declarations: [UploadPhotosComponent, UploadTaskComponent],
  imports: [
    CommonModule,
    UploadPhotosRoutingModule,
    SharedModule
  ]
})
export class UploadPhotosModule { }
