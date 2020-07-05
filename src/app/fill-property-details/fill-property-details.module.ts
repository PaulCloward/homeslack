import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FillPropertyDetailsRoutingModule } from './fill-property-details-routing.module';
import { FillPropertyDetailsComponent } from './fill-property-details/fill-property-details.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [FillPropertyDetailsComponent],
  imports: [
    CommonModule,
    FillPropertyDetailsRoutingModule,
    SharedModule
  ]
})
export class FillPropertyDetailsModule { }
