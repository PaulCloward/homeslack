import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { TimeFrameComponent } from './time-frame/time-frame.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { ConfirmComponent } from './confirm/confirm.component';


const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'time-frame',
    component: TimeFrameComponent
  },
  {
    path: 'image-upload',
    component: ImageUploadComponent
  },
  {
    path: 'confirm',
    component: ConfirmComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
