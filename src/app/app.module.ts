import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms"
//Firebase
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";

//Toaster
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AuthenticateComponent } from './Components/authenticate/authenticate.component';

//Angular Material UI
import { MatDialogModule } from '@angular/material/dialog';

//ngx-bootstrap
import { ModalModule } from 'ngx-bootstrap/modal';
import { OverviewComponent } from './Components/overview/overview.component';

//UI Loader
import {NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER} from "ngx-ui-loader";

//UI Loader Configuration
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "red",
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.cubeGrid, // background spinner type
  fgsType: SPINNER.circle, // foreground spinner type
  // pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 0, // progress bar thickness
};

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    DashboardComponent,
    NavbarComponent,
    AuthenticateComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCPb0-5YNHODtFV7iUVIuViNK6iqMAT0vU",
      authDomain: "myvehicle-9b75e.firebaseapp.com",
      databaseURL: "https://myvehicle-9b75e-default-rtdb.firebaseio.com",
      projectId: "myvehicle-9b75e",
      storageBucket: "myvehicle-9b75e.appspot.com",
      messagingSenderId: "238451151894",
      appId: "1:238451151894:web:99fdd031cfb67246e51137",
      measurementId: "G-VJ75B5KJMT"
    }),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      closeButton: true
    }),
    BrowserAnimationsModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MatDialogModule,
    ModalModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
