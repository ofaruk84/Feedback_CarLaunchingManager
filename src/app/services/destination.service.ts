import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators'
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Destination } from '../models/destination';
import { Country } from '../models/country';
import { ApiCity } from '../models/apiCitiy';
@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  apiUrl = 'https://localhost:44366/api/Destinations/';

  citiesApi = "https://countriesnow.space/api/v0.1/countries/states"

  constructor(private httpClient: HttpClient) {}

  getDestinationsByCountryId(countryId: number): Observable<ListResponseModel<Destination>> {
    let newPath =
      this.apiUrl + 'getdestinationbycountryid?countryId=' + countryId;
    return this.httpClient.get<ListResponseModel<Destination>>(newPath);
  }

  getAll(): Observable<ListResponseModel<Destination>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Destination>>(newPath);
  }
  getDestinationsByCountry(country: Country): Observable<ListResponseModel<Destination>> {
    let newPath =
      this.apiUrl + "getdestinationbycountry";
    return this.httpClient.post<ListResponseModel<Destination>>(newPath,country);
  }

  getCitiesByCountry(country:string):Observable<SingleResponseModel<ApiCity>>{

    return this.httpClient.post<SingleResponseModel<ApiCity>>(this.citiesApi,{"country":country});
  }

  addDestination(destination:Destination){
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post(newPath,destination).pipe(catchError(this.handleError))
  }

  deleteByDestinationName(destinationName:string){
    let newPath = this.apiUrl + "deletebydestinationname?destinationName="+destinationName;

    return this.httpClient.post(newPath,null);
  }

  getByDestinationName(destinationName:string):Observable<SingleResponseModel<Destination>>{
    let newPath = this.apiUrl + "deletebydestinationname?destinationName="+destinationName;

    return this.httpClient.get<SingleResponseModel<Destination>>(newPath);
  }
  
  handleError(error: HttpErrorResponse) {
    return throwError(error);
}

}
