import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private testUser = {
    email: "admin@gmail.com",
    password: "123456"
  };

  constructor(private http: HttpClient) { }

  public login() {
    const url = 'http://127.0.0.1:3001/login';
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(url, this.testUser, { headers: headers } );
  }

  public users() {
    const url = 'http://127.0.0.1:3001/users';
    const headers = new HttpHeaders();

    headers.set('Content-Type', 'application/json');
    return this.http.get(url,  { headers: headers } );
  }
}
