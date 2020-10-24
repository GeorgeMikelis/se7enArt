import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enums/api-paths';

export interface AuthResponseData {
  response: {
    user: {
      firstname: string;
      lastname: string;
      username: string;
      id: string;
    };
    jwt: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  signUp(firstname: string, lastname: string, username: string, password: string) {
    let url = `${this.baseUrl}/${ApiPaths.signUp}`;
    let body = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password
    }
    console.log(body);
    return this.http.post<JSON>(
      url,
      body
    )
  }

  login(username: string, password: string) {
    let url = `${this.baseUrl}/${ApiPaths.login}`;
    let body = {
      username: username,
      password: password
    }
    console.log(body);
    return this.http.post<JSON>(
      url,
      body
    )
  }
}
