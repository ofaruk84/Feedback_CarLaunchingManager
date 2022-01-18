import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AttendeeMail } from '../models/attendeeMail';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  apiUrl = 'https://localhost:44366/api/Mails/';
  
  constructor(private httpClient: HttpClient) {}

  sendPassword(attendeeMail:AttendeeMail){

    let newUrl = this.apiUrl+"sendPassword";

    return this.httpClient.post(newUrl,attendeeMail);

  }
}
