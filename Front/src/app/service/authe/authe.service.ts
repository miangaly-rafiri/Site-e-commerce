import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AutheService {
  private apiUrl = environment.apiUrl;

  optionRequete= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    responseType: 'text' as 'json',
  };

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    // Utilisation des options définies
    return this.http.post(`${this.apiUrl}/login`, { username:username, password:password }, this.optionRequete)
  }
  register(username:string, email:string, password:string){
    return this.http.post(`${this.apiUrl}/register`, {username:username, email:email, password:password}, this.optionRequete)
  }
}
