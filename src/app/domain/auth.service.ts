import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ApiPaths } from '../enums/api-paths';
import { UserWithJWT } from '../models/user-with-jwt';

export interface AuthResponseData {
  user: {
    firstname: string;
    lastname: string;
    username: string;
    id: string;
  };
  jwt: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<UserWithJWT>(null);
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  signUp(
    firstname: string,
    lastname: string,
    username: string,
    password: string
  ) {
    let url = `${this.baseUrl}/${ApiPaths.signUp}`;
    let body = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
    };
    console.log(body);
    return this.http.post<AuthResponseData>(url, body).pipe(
      catchError(this.habdleError),
      tap((resData) => {
        this.handleAuthentication(
          resData.user.firstname,
          resData.user.lastname,
          resData.user.username,
          resData.user.id,
          resData.jwt,
          false
        );
      })
    );
  }

  login(username: string, password: string, rememberMe: boolean) {
    let url = `${this.baseUrl}/${ApiPaths.login}`;
    let body = {
      username: username,
      password: password,
    };
    console.log(body);
    return this.http.post<AuthResponseData>(url, body).pipe(
      catchError(this.habdleError),
      tap((resData) => {
        this.handleAuthentication(
          resData.user.firstname,
          resData.user.lastname,
          resData.user.username,
          resData.user.id,
          resData.jwt,
          rememberMe
        );
      })
    );
  }

  private handleAuthentication(
    firstname: string,
    lastname: string,
    username: string,
    id: string,
    jwt: string,
    rememberMe: boolean
  ) {
    const user = new UserWithJWT(firstname, lastname, username, id, jwt);
    this.user.next(user);
    if (rememberMe) {
      sessionStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('userData', JSON.stringify(user));
    } else {
      sessionStorage.setItem('userData', JSON.stringify(user));
    }
  }

  private habdleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'Conflict username exists':
        errorMessage = 'This username exists already.';
        break;
      case 'Bad Request':
        errorMessage = 'Your credencials are not correct';
        break;
    }
    return throwError(errorMessage);
  }
}
