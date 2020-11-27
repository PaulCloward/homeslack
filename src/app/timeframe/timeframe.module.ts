import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeframeRoutingModule } from './timeframe-routing.module';
import { TimeframeComponent } from './timeframe/timeframe.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [TimeframeComponent],
  imports: [
    CommonModule,
    TimeframeRoutingModule,
    SharedModule
  ]
})
export class TimeframeModule { }
