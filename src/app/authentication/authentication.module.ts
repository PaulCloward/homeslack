import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestorRegistrationComponent } from './investor-registration/investor-registration.component';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SellerRegistrationComponent } from './seller-registration/seller-registration.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { InvestorLoginComponent } from './investor-login/investor-login.component';
@NgModule({
  declarations: [InvestorRegistrationComponent, SellerRegistrationComponent, SellerLoginComponent, InvestorLoginComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule, 
    FormsModule, 
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AuthenticationModule { }
