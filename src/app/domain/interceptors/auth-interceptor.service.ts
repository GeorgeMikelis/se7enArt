import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpHeaders} from '@angular/common/http';
import { take, exhaustMap} from 'rxjs/operators'

import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                if (!user) {
                  console.log('Since we do not have a user this is a request to login or to sign-up so we do not have a jwt to put to the header yet')
                    return next.handle(req);
                }
                const modifiedReq = req.clone({
                  setHeaders: {
                    token: user.jwt
                  }
                    // headers: new HttpHeaders().set('token', user.jwt)
                });
                console.log('We have a user so we put jwt to all the requests from now on')
                return next.handle(modifiedReq);
            })
        );
    }
}
