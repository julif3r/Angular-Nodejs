import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { UserLogin } from '../models/userLogin.model';
import { AuthenticateResponse } from '../models/authenticateResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private api: ApiService) {}

  public async login(user: UserLogin): Promise<AuthenticateResponse> {
    const result = await this.api.login(user).toPromise();

    if ( result.data ) {
      console.log(result);
      localStorage.setItem('currentUser', JSON.stringify(result.data));
    }
    return result;
  }

}
