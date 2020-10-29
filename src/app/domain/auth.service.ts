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
  fresh2HoursDuration: number = 7200 * 1000;
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
        const remainingDuration = new Date(userData._jwtExpirationDate).getTime() - new Date().getTime()
        this.autoLogout(remainingDuration);
    } else {
      this.logout();
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

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
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
      new Date().getTime() + this.fresh2HoursDuration
    );
    const user = new UserWithJWT(firstname, lastname, username, id, jwt, expirationDate);
    this.user.next(user);
    this.autoLogout(this.fresh2HoursDuration);
    if (rememberMe) {
      sessionStorage.setItem('userData', JSON.stringify(user));
      localStorage.setItem('userData', JSON.stringify(user));
      this.router.navigate(['/']);
    } else {
      sessionStorage.setItem('userData', JSON.stringify(user));
      this.router.navigate(['/']);
    }
  }

  public habdleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An error occurred!';
    console.log(errorRes.error.message);
    if (!errorRes.error || !errorRes.error.message) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.message) {
      case 'Conflict username exists':
        errorMessage = 'This username exists already!';
        break;
      case 'Bad Request':
        errorMessage = 'Your credentials are not correct!';
        break;
      case 'Conflict title exists':
        errorMessage = 'This title exists alread!y';
        break;
      case 'Bad Request. "dateReleased" must be less than or equal to "now"':
        errorMessage = 'The year of release cannot be greater than now!';
        break;
    }
    return throwError(errorMessage);
  }
}
