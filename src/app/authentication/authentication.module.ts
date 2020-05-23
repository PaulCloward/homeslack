import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestorRegistrationComponent } from './investor-registration/investor-registration.component';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [InvestorRegistrationComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule, 
    FormsModule, 
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthenticationModule { }
