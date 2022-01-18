import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Token } from '../models/token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://localhost:44366/api/auth/";

constructor(private httpClient:HttpClient) { }

  login(login:Login){

    return this.httpClient.post<SingleResponseModel<Token>>(this.apiUrl+ "login" ,login)
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }



}