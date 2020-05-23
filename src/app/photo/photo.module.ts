import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotoRoutingModule } from './photo-routing.module';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';


@NgModule({
  declarations: [ImageGalleryComponent],
  imports: [
    CommonModule,
    PhotoRoutingModule
  ]
})
export class PhotoModule { }
