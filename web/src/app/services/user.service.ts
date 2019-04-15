import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { RoleCreate } from '../models/roleCreate.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService) { }

  public createRole(role: RoleCreate) {
    return this.api.createRole(role);
  }
}
