import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AttendeeAuthService } from 'src/app/services/attendee-auth.service';
import { AttendeeLoginModel } from 'src/app/models/attendeeLoginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alertifyService: AlertifyService,
    private attendeeAuth:AttendeeAuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {

    console.log("aa")
    if (this.loginForm.invalid) {
      return;
    }
    //let loginModel = Object.assign({},this.loginForm.value);
    let email = this.loginForm.controls['email'].value;
    let password = this.loginForm.controls['password'].value;
    let attendeeLoginModel: AttendeeLoginModel = { email: email, password: password };

    this.attendeeAuth.login(attendeeLoginModel).subscribe(
      (response) => {
        console.log(response);
        console.log('girdi');
        localStorage.setItem('token', response.data.token);
        console.log('girdi2');
        console.log('girdi3');
      },
      (responseError) => {
        console.log("aasd");
        console.log(responseError);
        this.alertifyService.errorMessage('Please Check Your Credientials');
      },
      () => {
        // window.location.reload();
        this.alertifyService.successMessage('Logged In');
        this.router.navigate(['users']).then(() => {
          window.location.reload();
        });
      }
    );
  }
}