import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeService } from './services/home.service';
import { SearchPropertyService } from './services/search-property.service';
import { PropertyFinderService } from './services/property-finder.service';
import { SellerPropertyService } from './services/seller-property.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';
import { FileSizePipe } from './file-size.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { VerifyInfoPageComponent } from './components/verify-info-page/verify-info-page.component';
import { AgmCoreModule } from '@agm/core';
import { CreateaccountComponent } from './components/createaccount/createaccount.component';
import { LoginComponent } from './components/login/login.component';
import { FlashMessageComponent } from './components/flash-message/flash-message.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactComponent } from './components/contact/contact.component';
import { WhyUsComponent } from './components/why-us/why-us.component';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { TooltipModule } from 'ng2-tooltip-directive';

import { ViewPropertiesComponent } from './components/view-properties/view-properties.component';
import { SellerAccountComponent } from './components/seller-account/seller-account.component';
import { SellerListedPropertyComponent } from './components/seller-listed-property/seller-listed-property.component';
import { InvestorListedPropertyComponent } from './components/investor-listed-property/investor-listed-property.component';
import { InvestorAccountComponent } from './components/investor-account/investor-account.component';
import { FillInPropertyInfoPageComponent } from './components/fill-in-property-info-page/fill-in-property-info-page.component';
import { ConfirmListingComponent } from './components/confirm-listing/confirm-listing.component';
import { MyOffersComponent } from './components/my-offers/my-offers.component';
import { OfferItemComponent } from './components/offer-item/offer-item.component';
import { ExpandedPropertyComponent } from './components/expanded-property/expanded-property.component';
import { DirectoryComponent } from './components/directory/directory.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { InboxMessageComponent } from './components/inbox-message/inbox-message.component';
import { FooterComponent } from './components/footer/footer.component';
import { TermsComponent } from './components/terms/terms.component';
import { ImagesComponent } from './components/images/images.component';
import { ImageComponent } from './components/images/image/image.component';
import { ImageListComponent } from './components/images/image-list/image-list.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { LockComponent } from './components/lock/lock.component';

import { AuthGuard } from './core/auth.guard';
import { ListingTimeComponent } from './components/listing-time/listing-time.component';
import { NgbDatePipe } from './pipes/ngb-date.pipe';

import { NgxCurrencyModule } from "ngx-currency";
import { ImageService } from './services/image.service';
import { AuthenticationService } from './services/authentication.service';
import { UploadPhotosComponent } from './components/upload-photos/upload-photos.component';
import { UploaderComponent } from './components/uploader/uploader.component';
import { UploadTaskComponent } from './components/uploader-task/uploader-task.component';


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
   {path: '', component: HomeComponent},
  // {path:'', redirectTo: 'image/upload', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'verify-info-page', component: VerifyInfoPageComponent},
  {path: 'fill-in-property-info-page', component: FillInPropertyInfoPageComponent},
  {path: 'create-account', component: CreateaccountComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'why-us', component: WhyUsComponent},
  {path: 'view-property', component: ViewPropertiesComponent},
  {path: 'seller-account', component: SellerAccountComponent},
  {path: 'seller-listings', component: SellerListedPropertyComponent},
  {path: 'investor-account', component: InvestorAccountComponent},
  {path: 'confirm-listing', component: ConfirmListingComponent},
  {path: 'offers', component: MyOffersComponent},
  {path: 'expanded-property', component: ExpandedPropertyComponent},
  {path: 'directory', component: DirectoryComponent},
  {path: 'inbox', component: InboxComponent},
  { path: 'listing-time', component: ListingTimeComponent},
  { path: 'terms', component: TermsComponent},
  { path: 'upload-photos', component: UploadPhotosComponent},
  { path: 'uploader', component: UploaderComponent},
  { path: 'images', component:ImagesComponent, children:[
      { path:'upload', component: ImageComponent},
      { path:'list', component:ImageListComponent}
  ] 
}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VerifyInfoPageComponent,
    CreateaccountComponent,
    LoginComponent,
    FlashMessageComponent,
    NavbarComponent,
    ContactComponent,
    WhyUsComponent,
    DropZoneDirective,
    FileSizePipe,
    ViewPropertiesComponent,
    SellerAccountComponent,
    SellerListedPropertyComponent,
    InvestorListedPropertyComponent,
    InvestorAccountComponent,
    FillInPropertyInfoPageComponent,
    ConfirmListingComponent,
    MyOffersComponent,
    OfferItemComponent,
    ExpandedPropertyComponent,
    DirectoryComponent,
    InboxComponent,
    InboxMessageComponent,
    LockComponent,
    ListingTimeComponent,
    NgbDatePipe,
    FooterComponent,
    TermsComponent,
    ImageComponent,
    ImagesComponent,
    ImageListComponent,
    UploadPhotosComponent,
    UploaderComponent,
    UploadTaskComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule, 
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqIGTMDUu1dMCaKr3eyt5XgNqUCOCTNFc',
      libraries: ["places"]
    }),
    FormsModule,
    NgbModule.forRoot(),
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
    CommonModule
  ],
  providers: [HomeService, AuthGuard, ImageService, PropertyFinderService, SellerPropertyService, AuthenticationService, SearchPropertyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
