import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectoyNewComponent } from './directoy-new/directoy-new.component';


const routes: Routes = [
  {
    path: '', component: DirectoyNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectoryNewRoutingModule { }
