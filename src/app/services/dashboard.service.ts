import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardItem } from '../models/dashboardItem';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  apiUrl:string ="https://localhost:44366/api/Events/geteventsdtos"
  
  constructor(private httpClient:HttpClient){}
  
  getEvents():Observable<ListResponseModel<DashboardItem>>
  {
    return this.httpClient.get<ListResponseModel<DashboardItem>>(this.apiUrl);
  }

}