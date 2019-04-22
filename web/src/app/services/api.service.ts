import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserLogin } from '../models/userLogin.model';
import { RoleCreate } from '../models/roleCreate.model';
import { Observable } from 'rxjs';
import { AuthenticateResponse } from '../models/authenticateResponse.model';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { UserCreate } from '../models/userCreate.model';

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

  public getUsers(): Observable<{data: User[]}> {
    const url =  this.apiUrl + '/users';
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.get<{data: User[]}>(url, { headers: headers } );
  }

  public createUser(user: UserCreate): Observable<{data: User}> {
    const url =  this.apiUrl + '/users';
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post<{data: User}>(url, user, { headers: headers } );
  }

  public getRoles(): Observable<{data: Role[]}> {
    const url =  this.apiUrl + '/roles';
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.get<{data: Role[]}>(url, { headers: headers } );
  }

  public createRole(role: RoleCreate): Observable<{data: Role}> {
    const url =  this.apiUrl + '/roles';
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post<{data: Role}>(url, role, { headers: headers } );
  }

  public deleteUser(userid: number) {
    const url =  this.apiUrl + '/users/' + userid;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.delete(url, { headers: headers } );
  }

  public deleteRole(roleId: number) {
    const url =  this.apiUrl + '/roles/' + roleId;
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.delete(url, { headers: headers } );
  }

}
