import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyPropertyComponent } from './verify-property/verify-property.component';



const routes: Routes = [
  {
    path: '', component: VerifyPropertyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyPropertyRoutingModule { }
