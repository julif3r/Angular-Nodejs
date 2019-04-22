import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RoleCreate } from '../models/roleCreate.model';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserCreate } from '../models/userCreate.model';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService) { }

  public getUsers(): Observable<{data: User[]}> {
    return this.api.getUsers();
  }

  public createUser(user: UserCreate): Observable<{data: User}> {
    return this.api.createUser(user);
  }

  public deleteUser(userid: number): Promise<any> {
    return this.api.deleteUser(userid).toPromise();
  }

  public getRoles(): Observable<{data: Role[]}>  {
    return this.api.getRoles();
  }

  public createRole(role: RoleCreate): Observable<{data: Role}> {
    return this.api.createRole(role);
  }

  public deleteRole(roleId: number): Promise<any> {
    return this.api.deleteRole(roleId).toPromise();
  }
}
