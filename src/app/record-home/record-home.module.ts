import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordHomeRoutingModule } from './record-home-routing.module';
import { RecordHomeComponent } from './record-home/record-home.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [RecordHomeComponent],
  imports: [
    CommonModule,
    RecordHomeRoutingModule,
    SharedModule
  ]
})
export class RecordHomeModule { }
