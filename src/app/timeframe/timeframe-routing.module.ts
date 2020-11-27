import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimeframeComponent } from '../timeframe/timeframe/timeframe.component';

const routes: Routes = [
  {
    path: '', component: TimeframeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimeframeRoutingModule { }
