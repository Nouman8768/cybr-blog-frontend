import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError, switchMap, tap } from 'rxjs';
import { Token } from '../dto/token.dto';

import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private readonly inject: Injector,
    private readonly route: Router,
    private readonly userService: UserService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let service = this.inject.get(AuthService);

    // let authRequest = req;
    const token = localStorage.getItem('accesstoken');

    if (token) {
      console.log('Before', token);

      // const cloned = req.clone({
      //   setHeaders: {
      //     Authorization: token,
      //   },
      // });
      const authRequest = this.addTokenHeader(req, token);
      console.log('After', authRequest);
      return next.handle(authRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            alert('401 Unathurized');
            this.route.navigate(['authentication/login']);
          }
          return throwError(error);
        })
      );
    } else {
      return next.handle(req);
    }
  }

  async handleRefToken(req: HttpRequest<any>, next: HttpHandler) {
    let token = localStorage.getItem('refreshtoken');

    if (token) {
      const res = req.clone({
        headers: req.headers.set('Authorization', token),
      });
    }

    let service = this.inject.get(AuthService);
    const tokens: Token = await service.refreshToken();
    if (tokens != null) {
      localStorage.setItem('accesstoken', tokens.Tokens.accessToken);

      localStorage.setItem('refreshtoken', tokens.Tokens.refreshToken);

      return next.handle(this.addTokenHeader(req, tokens.Tokens.accessToken));
    } else {
      return console.log('Error');
    }
  }

  addTokenHeader(request: HttpRequest<any>, token: string | null) {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token!),
    });
  }
}
