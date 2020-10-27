import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

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
  jwt?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userFromLocal = JSON.parse(localStorage.getItem('userData'));
  user = new BehaviorSubject<UserWithJWT>(this.userFromLocal);
  baseUrl = environment.baseUrl;
  expirationDuration: number = 7200 * 1000;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

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

  updateUser(
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
    return this.http.put<AuthResponseData>(url, body).pipe(
      catchError(this.habdleError),
      tap((resData) => {
        console.log(resData), this.logout();
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

  autoLogin() {
    const userData: UserWithJWT = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
        return;
    }

    const loadedUser = new UserWithJWT(
        userData.firstname,
        userData.lastname,
        userData.username,
        userData.id,
        userData._jwt,
        new Date(userData._jwtExpirationDate)
    );

    if (loadedUser.jwt) {
        this.user.next(loadedUser);
        this.autoLogout();
    }
}

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth/login']);
    sessionStorage.removeItem('userData');
    localStorage.removeItem('userData');
    if (!this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout() {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, this.expirationDuration);
  }

  private handleAuthentication(
    firstname: string,
    lastname: string,
    username: string,
    id: string,
    jwt: string,
    rememberMe: boolean
  ) {
    const expirationDate = new Date(
      new Date().getTime() + this.expirationDuration
    );
    const user = new UserWithJWT(firstname, lastname, username, id, jwt, expirationDate);
    this.user.next(user);
    this.autoLogout();
    if (rememberMe) {
      sessionStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('userData', JSON.stringify(user));
      this.router.navigate(['/']);
    } else {
      sessionStorage.setItem('userData', JSON.stringify(user));
      this.router.navigate(['/']);
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
      case 'Conflict username exists':
        errorMessage = 'You must change you username';
        break;
    }
    return throwError(errorMessage);
  }
}
