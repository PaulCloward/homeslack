import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestorRegistrationComponent } from './investor-registration/investor-registration.component';
import { SellerRegistrationComponent } from './seller-registration/seller-registration.component';
import { InvestorLoginComponent } from './investor-login/investor-login.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';


const routes: Routes = [
  {
    path: '',
    component: InvestorRegistrationComponent
  },
  {
    path: 'investor-register',
    component: InvestorRegistrationComponent
  },
  {
    path: 'seller-register',
    component: SellerRegistrationComponent
  },
  {
    path: 'investor-login',
    component: InvestorLoginComponent
  },
  {
    path: 'seller-login',
    component: SellerLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
