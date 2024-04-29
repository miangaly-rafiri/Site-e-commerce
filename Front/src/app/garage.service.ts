import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GarageService {
readonly API_URL= "http://localhost:3000"
readonly ENDPOINT_THE ="/products"
  constructor(private httpClient:HttpClient) {
   }
   getProducts() {
    return this.httpClient.get(this.API_URL+this.ENDPOINT_THE)
  }
}
