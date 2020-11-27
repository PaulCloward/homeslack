import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhyUsRoutingModule } from './why-us-routing.module';
import { WhyUsComponent } from './why-us/why-us.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [WhyUsComponent],
  imports: [
    CommonModule,
    WhyUsRoutingModule,
    SharedModule
  ]
})
export class WhyUsModule { }
