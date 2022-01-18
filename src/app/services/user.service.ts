import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  apiUrl = 'https://localhost:44366/api/Users/';
  
  constructor(private httpClient: HttpClient) {}

  getAll():Observable<ListResponseModel<User>>{

    let newPath = this.apiUrl + "getall";

    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }
  getByid(id:number):Observable<SingleResponseModel<User>>{

    let newPath = this.apiUrl + "getbyid";

    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  addUser(user:User){
    let newPath = this.apiUrl + "add";

    return this.httpClient.post(newPath,user);
  }
  deleteUser(user:User){
    let newPath = this.apiUrl + "delete";

    return this.httpClient.post(newPath,user);
  }

  deleteByUsername(username:string){
    let newPath = this.apiUrl + "deletebyname?username="+username;

    return this.httpClient.post(newPath,null);
  }

  getByUsername(username:string):Observable<SingleResponseModel<User>>{
    let newPath = this.apiUrl + "getbyusername?username="+username;

    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  update(user:User){
    let newPath = this.apiUrl + "update";

    return this.httpClient.post(newPath,user);
  }
  

  
}
