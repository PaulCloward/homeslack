import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FirebaseService } from './services/firebase.service';
import { HomeService } from './services/home.service';
import { ItemService } from './services/item.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';
import { FileSizePipe } from './file-size.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

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
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

import * as $ from 'jquery';
import { ViewPropertiesComponent } from './components/view-properties/view-properties.component';
import { TimeFrameComponent } from './components/time-frame/time-frame.component';
import { SellerAccountComponent } from './components/seller-account/seller-account.component';
import { SellerListedPropertyComponent } from './components/seller-listed-property/seller-listed-property.component';
import { InvestorListedPropertyComponent } from './components/investor-listed-property/investor-listed-property.component';
import { InvestorAccountComponent } from './components/investor-account/investor-account.component';
import { FillInPropertyInfoPageComponent } from './components/fill-in-property-info-page/fill-in-property-info-page.component';
import { ConfirmListingComponent } from './components/confirm-listing/confirm-listing.component';
import { ItemsComponent } from './components/items/items.component';
import { ListOccupancyStatusComponent } from './components/list-occupancy-status/list-occupancy-status.component';
import { MyOffersComponent } from './components/my-offers/my-offers.component';
import { OfferItemComponent } from './components/offer-item/offer-item.component';
import { ExpandedPropertyComponent } from './components/expanded-property/expanded-property.component';
import { DirectoryComponent } from './components/directory/directory.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { InboxMessageComponent } from './components/inbox-message/inbox-message.component';
import { CreateAccountInvestorComponent } from './components/create-account-investor/create-account-investor.component';
import { ReadComponent } from './components/read/read.component';
import { CreateComponent } from './components/create/create.component';

import { NgxsModule } from '@ngxs/store';
import { TutorialState } from './state/tutorial.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'verify-info-page', component: VerifyInfoPageComponent},
  {path: 'fill-in-property-info-page', component: FillInPropertyInfoPageComponent},
  {path: 'create-account', component: CreateaccountComponent},
  {path: 'create-account-investor', component: CreateAccountInvestorComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'why-us', component: WhyUsComponent},
  {path: 'image-upload', component: ImageUploadComponent},
  {path: 'view-property', component: ViewPropertiesComponent},
  {path: 'seller-account', component: SellerAccountComponent},
  {path: 'seller-listings', component: SellerListedPropertyComponent},
  {path: 'time-frame', component: TimeFrameComponent},
  {path: 'investor-account', component: InvestorAccountComponent},
  {path: 'confirm-listing', component: ConfirmListingComponent},
  {path: 'items', component: ItemsComponent},
  {path: 'listing-occupancy', component: ListOccupancyStatusComponent},
  {path: 'offers', component: MyOffersComponent},
  {path: 'expanded-property', component: ExpandedPropertyComponent},
  {path: 'directory', component: DirectoryComponent},
  {path: 'inbox', component: InboxComponent},
  {path: 'read', component: ReadComponent},
  { path: 'create', component: CreateComponent},
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
    ImageUploadComponent,
    FileSizePipe,
    ViewPropertiesComponent,
    TimeFrameComponent,
    SellerAccountComponent,
    SellerListedPropertyComponent,
    InvestorListedPropertyComponent,
    InvestorAccountComponent,
    FillInPropertyInfoPageComponent,
    ConfirmListingComponent,
    ItemsComponent,
    ListOccupancyStatusComponent,
    MyOffersComponent,
    OfferItemComponent,
    ExpandedPropertyComponent,
    DirectoryComponent,
    InboxComponent,
    InboxMessageComponent,
    CreateAccountInvestorComponent,
    ReadComponent,
    CreateComponent,


  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    AngularFireFunctionsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAqIGTMDUu1dMCaKr3eyt5XgNqUCOCTNFc',
      libraries: ["places"]
    }),
    FormsModule,
    NgbModule.forRoot(),
    NgxsModule.forRoot([
      TutorialState
      ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
  ],
  providers: [FirebaseService, AngularFireDatabase, ItemService, HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
