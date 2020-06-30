import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseListingsComponent } from './browse-listings/browse-listings.component';
import { ListingsComponent } from './listings/listings.component';
import { PropertyProfileComponent } from './property-profile/property-profile.component';
const routes: Routes = [
  {
    path: '',
    component: BrowseListingsComponent
  },
  {
    path: 'browse-listings',
    component: BrowseListingsComponent
  },
  {
    path: 'listings',
    component: ListingsComponent
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
