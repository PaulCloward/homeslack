import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarShellComponent } from './navbar-shell/navbar-shell.component';

import { StrictNumberOnlyDirective } from '../directives/StrictNumberOnlyDirective';
import { NgbDatePipe } from '../pipes/ngb-date.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageSliderComponent } from '../components/image-slider/image-slider.component';
import { FooterComponent } from './footer/footer.component';

const components = [
  FooterComponent,
  NavbarShellComponent,
  NgbDatePipe,
  ImageSliderComponent
]

const modules = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  MatToolbarModule,
  MatIconModule,
  LayoutModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatSliderModule,
  MatRadioModule,
  MatDialogModule,
  MatCheckboxModule,
  MatTooltipModule,
  NgbModule,
  AgmCoreModule.forRoot({
    apiKey: 'AIzaSyAqIGTMDUu1dMCaKr3eyt5XgNqUCOCTNFc',
    libraries: ["places"]
  }),
];

@NgModule({
  declarations: [...components, StrictNumberOnlyDirective, FooterComponent],
  imports: [
    ...modules
  ],
  exports: [
    ...modules,
    ...components,
    StrictNumberOnlyDirective
  ]
})
export class SharedModule { }