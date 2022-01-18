import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators'
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { Country } from '../models/country';
import { ApiCountry } from '../models/apiCountry';


@Injectable({
  providedIn: 'root',
})
export class CountryService {
  apiUrl = 'https://localhost:44366/api/Countries/';

  countryApiUrl= 'https://countriesnow.space/api/v0.1/countries';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Country>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Country>>(newPath);
  }

  getCountryByName(name:string): Observable<SingleResponseModel<Country>> {
    let newPath = this.apiUrl + 'getbycountryname?countryName='+name;
    
    return this.httpClient.get<SingleResponseModel<Country>>(newPath);
  }

  getAllCountriesByApi(): Observable<ListResponseModel<ApiCountry>>{
    return this.httpClient.get<ListResponseModel<ApiCountry>>(this.countryApiUrl);
  }

  addCountry(country:Country){
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post(newPath,country).pipe(catchError(this.handleError))
  }

  getCountryIdByName(countryName:string):Observable<SingleResponseModel<number>>{

    let newPath = this.apiUrl + 'getcountryidbyname'
    
    return this.httpClient.post<SingleResponseModel<number>>(newPath,countryName);
  }

  deleteByCountryName(countryName:string){
    let newPath = this.apiUrl + "deletecountrybyname?countryName="+countryName;

    return this.httpClient.post(newPath,null);
  }

  getByCountryname(countryName:string):Observable<SingleResponseModel<Country>>{
    let newPath = this.apiUrl + "getbyusername?countryName="+countryName;

    return this.httpClient.get<SingleResponseModel<Country>>(newPath);
  }
  handleError(error: HttpErrorResponse) {
    return throwError(error);
}

  
}
