import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private authService:AuthService,private router:Router,private alertifyService:AlertifyService){

  }


  canActivate()
  {
    if(this.authService.isAuthenticated()){
      return true
    }

    this.alertifyService.errorMessage("Please Log in to Application First")
    this.alertifyService.successMessage("Redirecting to Login")
    this.router.navigate(['login']);
    return false;
  }
  
  
}
