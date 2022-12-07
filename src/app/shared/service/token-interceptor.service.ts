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

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private readonly inject: Injector,
    private readonly route: Router
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let service = this.inject.get(AuthService);
    // alert('InterCeptor Working');
    // if (!service.isLoggedOut) {
    //   return alert('Not Logged Out')
    // }
    // return

    // req = req.clone({
    //   headers: req.headers.set('Content-Type', 'application/json'),
    // });
    // let token = localStorage.getItem('refToken');
    // if (token) {
    //   req = req.clone({
    //     headers: req.headers.set('Authorization', 'Bearer' + token),
    //   });
    // }
    // return next.handle(req);

    let authRequest = req;
    if (service.getAccessToken()) {
      authRequest = this.addTokenHeader(req, service.getAccessToken());
    }

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (service.accessTokenExpired() || error.status === 401) {
          console.log('Refresh');
          this.route.navigate(['authentication/login']);

          // this.handleRefToken(req, next);
        } else {
          this.route.navigate(['authentication/login']);
        }
        return throwError(error);
      })
    );
    // return next.handle(authRequest).pipe(
    //   tap(
    //     () => {},
    //     (error: any) => {
    //       if (error instanceof HttpErrorResponse) {
    //         if (error.status !== 401) {
    //           console.log('Not 401');
    //           return;
    //         }
    //         this.route.navigate(['authentication/login']);
    //       }
    //     }
    //   )
    // );
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
      headers: request.headers.set('Authorization', token!),
    });
  }
}
