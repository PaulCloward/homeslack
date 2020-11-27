import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WhyUsComponent } from './why-us/why-us.component';


const routes: Routes = [
  {
    path: '', component: WhyUsComponent
  },
  {
    path: 'why-us', component: WhyUsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhyUsRoutingModule { }
