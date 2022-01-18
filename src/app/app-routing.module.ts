import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendeeDetailComponent } from './components/attendee-detail/attendee-detail.component';
import { AttendeeComponent } from './components/attendee/attendee.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { CountryComponent } from './components/country/country.component';
import { DestinationComponent } from './components/destination/destination.component';

import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  {path:'attendees',component:AttendeeComponent,canActivate:[AuthGuard]},
  {path:'users',component:UserComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'cars',component:CarComponent,canActivate:[AuthGuard]},
  {path:'countries',component:CountryComponent,canActivate:[AuthGuard]},
  {path:'destinations',component:DestinationComponent,canActivate:[AuthGuard]},
  {path:'cars/:id',component:CarDetailComponent,canActivate:[AuthGuard]},
  {path:'attendees/:id',component:AttendeeDetailComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'**',redirectTo:'login',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }