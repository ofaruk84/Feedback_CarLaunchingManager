import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { Token } from '@angular/compiler/src/ml_parser/tokens';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  apiUrl = 'https://localhost:44366/api/Auth/';
  
  constructor(private httpClient: HttpClient) {}

  register(user:User):Observable<SingleResponseModel<Token>>{

    let newUrl = this.apiUrl + "register"

    return this.httpClient.post<SingleResponseModel<Token>>(newUrl,user)
  }

  login(user:User):Observable<SingleResponseModel<Token>>{

    let newUrl = this.apiUrl + "login"

    return this.httpClient.post<SingleResponseModel<Token>>(newUrl,user)
  }
  

  
}
