import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private readonly inject: Injector) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let service = this.inject.get(AuthService);

    let authRequest = req;
    authRequest = this.addTokenHeader(req, service.getAccessToken());
    return next.handle(authRequest).pipe(
      catchError((error: any) => {
        if (error.status === 401) {
          service.logout();
        } else {
          console.log('Nothing Happend');
        }
        return throwError(error);
      })
    );
  }

  addTokenHeader(request: HttpRequest<any>, token: any) {
    return request.clone({
      headers: request.headers.set('Authorization', token),
    });
  }
}
