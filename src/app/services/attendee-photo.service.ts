import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { AttendeePhoto } from '../models/attendeePhoto';


@Injectable({
  providedIn: 'root'
})
export class AttendeePhotoService {

  apiUrl = 'https://localhost:44366/api/AttendeePhotos/';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<AttendeePhoto>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<AttendeePhoto>>(newPath);
  }

  getPhotosByAttendeeId(id:number): Observable<ListResponseModel<AttendeePhoto>> {
    let newPath = this.apiUrl + 'getphotosbyattendeeid?attendeeId='+id;
    return this.httpClient.get<ListResponseModel<AttendeePhoto>>(newPath);
  }
}