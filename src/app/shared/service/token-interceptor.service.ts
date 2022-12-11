import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
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
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accesstoken = this.authService.getAccessToken();
    const accessTokenExpired = this.authService.accessTokenExpired();

    if (accesstoken && !accessTokenExpired) {
      const authRequest = this.addTokenHeader(req, accesstoken);
      console.log('AccessAfter', authRequest);

      return next.handle(authRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.route.navigate(['authentication/login']);
            // this.handleRefToken(req, next);
          }
          return throwError(error);
        })
      );
    } else if (accessTokenExpired && this.userUrl()) {
      // let token = localStorage.getItem('refreshtoken');

      this.handleRefToken(req, next);
    }
    return next.handle(req);
  }

  async handleRefToken(req: HttpRequest<any>, next: HttpHandler) {
    const accessTokenExpired = this.authService.accessTokenExpired();
    const accesstoken = this.authService.getAccessToken();
    let refreshtoken = localStorage.getItem('refreshtoken');

    const tokens: Token = await this.authService.refreshToken();
    console.log(tokens);

    const authRequest = this.addTokenHeader(req, tokens.Tokens.accessToken);

    console.log('RefAccessAfter', authRequest);

    return next.handle(authRequest);
  }

  addTokenHeader(request: HttpRequest<any>, token: string | null) {
    return request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token!),
    });
  }

  userUrl() {
    return this.route.url === '/user';
  }
}
