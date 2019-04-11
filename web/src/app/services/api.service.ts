import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserLogin } from '../models/userLogin.model';
import { CreateRole } from '../models/createRole.model';
import { Observable } from 'rxjs';
import { AuthenticateResponse } from '../models/authenticateResponse.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://127.0.0.1:3001';

  constructor(private http: HttpClient) {
  }

  public login(userLogin: UserLogin): Observable<AuthenticateResponse> {
    const url = this.apiUrl + '/login';
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post<AuthenticateResponse>(url, userLogin, { headers: headers } );
  }

  public createRole(role: CreateRole) {
    const url =  this.apiUrl + '/roles';
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(url, role, { headers: headers } );
  }

}
