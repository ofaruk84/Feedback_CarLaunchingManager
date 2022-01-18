import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {HttpClientModule} from '@angular/common/http';
import { NaviComponent } from './components/navi/navi.component';
import { CountryComponent } from './components/country/country.component';
import { DestinationComponent } from './components/destination/destination.component';
import { UserComponent } from './components/user/user.component';
import { AttendeeComponent } from './components/attendee/attendee.component';
import { LoginComponent } from './components/login/login.component';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

import {FileUploadModule} from 'ng2-file-upload';
import { AttendeeDetailComponent } from './components/attendee-detail/attendee-detail.component'

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    CountryComponent,
    DestinationComponent,
    UserComponent,
    AttendeeComponent,
    LoginComponent,
    CarComponent,
    CarDetailComponent,
    AttendeeDetailComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
