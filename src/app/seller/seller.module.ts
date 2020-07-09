import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { TimeFrameComponent } from './time-frame/time-frame.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TimeFrameComponent, 
    ConfirmComponent, 
    ImageUploadComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule, 
    SharedModule
  ]
})
export class SellerModule { }
