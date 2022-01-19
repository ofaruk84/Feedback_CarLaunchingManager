import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardItem } from '../models/dashboardItem';
import { ListResponseModel } from '../models/listResponseModel';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  apiUrl:string ="https://localhost:44366/api/Feedback/"
  
  constructor(private httpClient:HttpClient){}
  
  add(feedback:Feedback)
  {
    let newUrl= this.apiUrl + "add"
    return this.httpClient.post(newUrl,feedback);
  }

}
