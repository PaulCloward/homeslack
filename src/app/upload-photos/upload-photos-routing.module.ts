import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadPhotosComponent } from './upload-photos/upload-photos.component';

const routes: Routes = [
  {
    path: '', component: UploadPhotosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadPhotosRoutingModule { }
