import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {HttpClientModule} from '@angular/common/http';
import { NaviComponent } from './components/navi/navi.component';

import { LoginComponent } from './components/login/login.component';


import {FileUploadModule} from 'ng2-file-upload';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { PhotofilterbycarPipe } from './pipes/photofilterbycar.pipe'

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    LoginComponent,
    DashboardComponent,
    EventDetailComponent,
    PhotofilterbycarPipe,
   
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
