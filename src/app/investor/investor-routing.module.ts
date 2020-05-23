import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseListingsComponent } from './browse-listings/browse-listings.component';
import { ListingsComponent } from './listings/listings.component';
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvestorRoutingModule { }
