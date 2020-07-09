import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertyProfileComponent } from './property-profile/property-profile.component';
import { MarketListingsComponent } from './market-listings/market-listings.component';
import { MonitorPropertiesComponent } from './monitor-properties/monitor-properties.component';
const routes: Routes = [
  {
    path: '',
    component: MonitorPropertiesComponent
  },
  {
    path: 'monitor-listings',
    component: MonitorPropertiesComponent
  },
  {
    path: 'market-listings',
    component: MarketListingsComponent
  },
  {
    path: 'property-profile',
    component: PropertyProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestorRoutingModule { }
