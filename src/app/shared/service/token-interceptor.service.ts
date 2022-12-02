import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, Observable, throwError, switchMap } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private readonly inject: Injector,
    private readonly route: Router,
    private readonly jwtHelper: JwtHelperService
  ) {}
  static token = '';

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let service = this.inject.get(AuthService);
    let authRequest = req;
    authRequest = this.addTokenHeader(req, service.getAccessToken());
    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // service.logout();
          // this.route.navigate(['authentication/login']);
          // alert('Session Expired');
          this.handleRefToken(req, next);
        } else {
          console.log('Nothing Happend');
        }
        return throwError(error);
      })
    );
  }
  handleRefToken(req: HttpRequest<any>, next: HttpHandler) {
    let service = this.inject.get(AuthService);
    return service.refreshToken().pipe(
      switchMap((data: any) => {
        localStorage.setItem('accessToken', data.accessToken),
          localStorage.setItem('refToken', data.refreshToken);

        return next.handle(this.addTokenHeader(req, data.accessToken));
      })
    );
  }

  addTokenHeader(request: HttpRequest<any>, token: any) {
    return request.clone({
      headers: request.headers.set('Authorization', token),
    });
  }
}
