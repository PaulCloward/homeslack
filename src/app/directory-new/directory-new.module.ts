import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectoryNewRoutingModule } from './directory-new-routing.module';
import { DirectoyNewComponent } from './directoy-new/directoy-new.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [DirectoyNewComponent],
  imports: [
    CommonModule,
    DirectoryNewRoutingModule,
    SharedModule
  ]
})
export class DirectoryNewModule { }
