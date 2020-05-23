import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestorRoutingModule } from './investor-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BrowseListingsComponent } from './browse-listings/browse-listings.component';
import { ListingItemComponent } from './listing-item/listing-item.component';
import { fromPromise } from 'rxjs/internal-compatibility';
import { ListingsComponent } from './listings/listings.component';


@NgModule({
  declarations: [BrowseListingsComponent, ListingItemComponent, ListingsComponent],
  imports: [
    CommonModule,
    InvestorRoutingModule,
    SharedModule
  ]
})
export class InvestorModule { }
