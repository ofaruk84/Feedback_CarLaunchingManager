import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { Observable, throwError} from 'rxjs';

import { AttendeeRegisterModel } from '../models/attendeeRegisterModel';

@Injectable({
  providedIn: 'root'
})
export class AttendeeAuthService {

  //https://localhost:44366/api/AuthAttendee/register
  //https://localhost:44366/api/AuthAttendee/register

  apiUrl:string ="https://localhost:44366/api/AuthAttendee/"

  constructor(private httpClient:HttpClient) { }

  register(attendee:AttendeeRegisterModel){

    let newPath = this.apiUrl+"register"
    return this.httpClient.post(newPath,attendee);
  }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
}

  
}
