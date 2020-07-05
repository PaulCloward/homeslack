import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FillPropertyDetailsComponent } from './fill-property-details/fill-property-details.component';


const routes: Routes = [
  {
    path: '', component: FillPropertyDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FillPropertyDetailsRoutingModule { }
