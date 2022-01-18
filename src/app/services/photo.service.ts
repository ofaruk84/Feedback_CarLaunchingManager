import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Photo } from '../models/photo';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  apiUrl = 'https://localhost:44366/api/Photos/';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Photo>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Photo>>(newPath);
  }

  getPhotosByCarId(id:number): Observable<ListResponseModel<Photo>> {
    let newPath = this.apiUrl + 'getphotosbycarid?carId='+id;
    return this.httpClient.get<ListResponseModel<Photo>>(newPath);
  }


 
  




}
