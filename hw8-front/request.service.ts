import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getIP(){
    let url = "https://ipinfo.io/?token=9947a332f5ea23";
    return this.http.get(url);
  }

  getFromCityState(city: string, state: string){
    let API_KEY = "AIzaSyCM7s8XMyDvSW2debhps_fmksNZA9jOsss"
    let base_url = 'https://maps.googleapis.com/maps/api/geocode/json?'
    let address = city + state;
    let params = {
      'key': API_KEY,
      'address': address
    }
    //console.log(address);
    return this.http.get(base_url, {params: params});
  }

  getIPFromAddress(user: User){
    let API_KEY = "AIzaSyCM7s8XMyDvSW2debhps_fmksNZA9jOsss"
    let base_url = 'https://maps.googleapis.com/maps/api/geocode/json?'
    let address = user.street + user.city + user.state;
    let params = {
      'key': API_KEY,
      'address': address
    }
    //console.log(address);
    return this.http.get(base_url, {params: params});
  }

  getAutoComplete(input: any){
    const params = new HttpParams().append('input', input);
    return this.http.get('/api/auto', {params});
  }

  getDataFromTomorrow(loc: any){
    const params = new HttpParams().append('location', loc);
    //console.log(params);
    return this.http.get('/api/get', {params});
  }

  getCurrentInfo(loc: any){
    const params = new HttpParams().append('location', loc);
    //console.log(params);
    return this.http.get('/api/getCur', {params});
  }

}
