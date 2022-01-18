import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Car } from '../models/car';
import { Photo } from '../models/photo';

@Injectable({
  providedIn: 'root'
})

export class CarService {

  apiUrl = 'https://localhost:44366/api/Cars/';
  
  constructor(private httpClient: HttpClient) {}

  getAll():Observable<ListResponseModel<Car>>{

    let newPath = this.apiUrl + "getall";

    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getByid(id:number):Observable<SingleResponseModel<Car>>{

    let newPath = this.apiUrl + "getbyid";

    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  addCar(car:Car){
    let newPath = this.apiUrl + "add";

    return this.httpClient.post(newPath,car);
  }

  deleteCar(car:Car){

    let newPath = this.apiUrl + "delete";

    return this.httpClient.post(newPath,car);
  }
  

}
