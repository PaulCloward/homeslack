import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeService } from './services/home.service';
import { SearchPropertyService } from './services/search-property.service';
import { SellerPropertyService } from './services/seller-property.service';
import { PropertySearchCoreLogicService } from './services/property-search-core-logic.service';
import { PropertySearchEstatedService } from './services/property-search-estated.service';
import { PopupService } from './investor/services/popup.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';
import { FileSizePipe } from './file-size.pipe';

import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';

import { LoginComponent } from './components/login/login.component';
import { FlashMessageComponent } from './components/flash-message/flash-message.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { TooltipModule } from 'ng2-tooltip-directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from './shared/shared.module';

import { SellerAccountComponent } from './components/seller-account/seller-account.component';
import { SellerListedPropertyComponent } from './components/seller-listed-property/seller-listed-property.component';
import { InvestorListedPropertyComponent } from './components/investor-listed-property/investor-listed-property.component';
import { MyOffersComponent } from './components/my-offers/my-offers.component';
import { OfferItemComponent } from './components/offer-item/offer-item.component';
import { ExpandedPropertyComponent } from './components/expanded-property/expanded-property.component';
import { DirectoryComponent } from './components/directory/directory.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { InboxMessageComponent } from './components/inbox-message/inbox-message.component';
import { TermsComponent } from './components/terms/terms.component';
import { ImagesComponent } from './components/images/images.component';
import { ImageComponent } from './components/images/image/image.component';
import { ImageListComponent } from './components/images/image-list/image-list.component';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { LockComponent } from './components/lock/lock.component';


import { AuthGuard } from './core/auth.guard';
import { ListingTimeComponent } from './components/listing-time/listing-time.component';

import { NgxCurrencyModule } from "ngx-currency";
import { ImageService } from './services/image.service';
import { AuthenticationService } from './services/authentication.service';
import { UploaderComponent } from './components/uploader/uploader.component';


import { SearchComponent } from './components/search/search.component';
import { AuthInvestorGuard } from './investor/auth-investor.guard';
import { AuthSellerGuard } from './seller/auth-seller.guard';




export const customCurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  allowZero: true,
  decimal: ".",
  precision: 0,
  prefix: "$ ",
  suffix: "",
  thousands: ",",
  nullable: false
};

const appRoutes: Routes = [
  // {path:'', redirectTo: 'image/upload', pathMatch:'full'},
 
  {path: 'login', component: LoginComponent},
  {path: 'seller-account', component: SellerAccountComponent},
  {path: 'seller-listings', component: SellerListedPropertyComponent},
  {path: 'offers', component: MyOffersComponent},
  {path: 'expanded-property', component: ExpandedPropertyComponent},
  {path: 'directory', component: DirectoryComponent},
  {path: 'inbox', component: InboxComponent},
  { path: 'listing-time', component: ListingTimeComponent},
  { path: 'terms', component: TermsComponent},
  { path: 'uploader', component: UploaderComponent},
  { path: 'images', component:ImagesComponent, children:[
      { path:'upload', component: ImageComponent},
      { path:'list', component:ImageListComponent}
    ] 
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'home', 
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'timeframe',
    loadChildren: () => import('./timeframe/timeframe.module').then(m => m.TimeframeModule)
  },
  {
    path: 'upload-photos',
    loadChildren: () => import('./upload-photos/upload-photos.module').then(m => m.UploadPhotosModule)
  },
   {
    path: 'photos',
    loadChildren: () => import('./photo/photo.module').then(m => m.PhotoModule)
  },
  {
    path: 'investor',
    loadChildren: () => import('./investor/investor.module').then(m => m.InvestorModule),
    canActivate: [AuthInvestorGuard]
  }, 
  {
    path: 'seller',
    loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule),
    canActivate: [AuthSellerGuard]
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
   },
   {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
   },
   {
     path: 'why-us',
     loadChildren: () => import('./why-us/why-us.module').then(m => m.WhyUsModule)
    },
    {
      path: 'directory-new',
      loadChildren: () => import('./directory-new/directory-new.module').then(m => m.DirectoryNewModule)
    },
    { 
       path: 'verify-property',
       loadChildren: () => import('./verify-property/verify-property.module').then(m => m.VerifyPropertyModule)
    },
    {
      path: 'fill-in-property-info-page',
      loadChildren: () => import('./fill-property-details/fill-property-details.module').then(m => m.FillPropertyDetailsModule)
    },
    {
      path: 'create-account', 
      loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
    },
    {
      path: 'record-home', 
      loadChildren: () => import('./record-home/record-home.module').then(m => m.RecordHomeModule)
    },
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FlashMessageComponent,
    NavbarComponent,
    DropZoneDirective,
    FileSizePipe,
    SellerAccountComponent,
    SellerListedPropertyComponent,
    InvestorListedPropertyComponent,
    MyOffersComponent,
    OfferItemComponent,
    ExpandedPropertyComponent,
    DirectoryComponent,
    InboxComponent,
    InboxMessageComponent,
    LockComponent,
    ListingTimeComponent,
    // FooterComponent,
    TermsComponent,
    ImageComponent,
    ImagesComponent,
    ImageListComponent,
    UploaderComponent,
    SearchComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule, 
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    HttpModule,
    FormsModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    TooltipModule, 
    MatTooltipModule,
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    SharedModule
  ],
  providers: [
    HomeService, 
    AuthGuard, 
    ImageService, 
    SellerPropertyService, 
    AuthenticationService, 
    SearchPropertyService,
    PropertySearchCoreLogicService,
    PropertySearchEstatedService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
