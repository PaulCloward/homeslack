import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestorRegistrationComponent } from './investor-registration/investor-registration.component';


const routes: Routes = [
  {
    path: '',
    component: InvestorRegistrationComponent
  },
  {
    path: 'investor-register',
    component: InvestorRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
