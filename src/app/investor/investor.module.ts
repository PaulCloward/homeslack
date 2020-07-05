import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvestorRoutingModule } from './investor-routing.module';
import { SharedModule } from '../shared/shared.module';
import { BrowseListingsComponent } from './browse-listings/browse-listings.component';
import { ListingItemComponent } from './listing-item/listing-item.component';
import { ListingsComponent } from './listings/listings.component';
import { PropertyItemComponent } from './property-item/property-item.component';
import { PropertyProfileComponent } from './property-profile/property-profile.component';
import { PopupService } from './services/popup.service';
import { PropertyViewService } from './services/property-view.service';
import { PopupComponent } from './popup/popup.component';
import { MarketListingsComponent } from './market-listings/market-listings.component';

@NgModule({
  declarations: [
    BrowseListingsComponent, 
    ListingItemComponent, 
    ListingsComponent, 
    PropertyItemComponent, 
    PropertyProfileComponent,
     PopupComponent, 
     MarketListingsComponent
    ],
  exports: [],
  imports: [
    CommonModule,
    InvestorRoutingModule,
    SharedModule
  ],
  providers: [
    PopupService,
    PropertyViewService
  ],
  entryComponents: [PopupComponent]
})
export class InvestorModule { }
