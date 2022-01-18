import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendee } from '../models/attendee';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class AttendeeService {

  

  apiUrl:string ="https://localhost:44366/api/Attendees/"

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ListResponseModel<Attendee>>
  {
     let newPath = this.apiUrl+"getall"
      return this.httpClient.get<ListResponseModel<Attendee>>(newPath);
  }

  addAttendee(attendee:Attendee){

    let newPath = this.apiUrl + "add";

    return this.httpClient.post(newPath,attendee);
  }
  
  deleteAttendee(attendee:Attendee){

    let newPath = this.apiUrl + "delete";

    return this.httpClient.post(newPath,attendee);
  }
}
