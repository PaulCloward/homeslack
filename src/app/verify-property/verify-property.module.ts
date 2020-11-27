import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifyPropertyRoutingModule } from './verify-property-routing.module';
import { VerifyPropertyComponent } from './verify-property/verify-property.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [VerifyPropertyComponent],
  imports: [
    CommonModule,
    VerifyPropertyRoutingModule,
    SharedModule
  ]
})
export class VerifyPropertyModule { }
