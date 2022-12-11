import { lastValueFrom, Observable } from 'rxjs';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserDto } from '../dto/user.dto';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '../dto/token.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly route: Router,
    private readonly jwtHelper: JwtHelperService
  ) {}
  url: string = environment.serverUrl;

  public async signUp(body: UserDto): Promise<UserDto> {
    let res = this.http.post<UserDto>(
      `${this.url}/authentication/register`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    let data = await lastValueFrom(res);
    return data;
  }

  public async login(credentials: UserDto): Promise<any> {
    let res = this.http.post<any>(
      `${this.url}/authentication/login`,
      credentials,
      {
        headers: {
          'Content-Type': 'Application/json',
        },
      }
    );
    let data = await lastValueFrom(res);
    return data;
  }

  public async uploadProfileImage(image: FormData): Promise<FormData> {
    let res = this.http.post<FormData | any>(`${this.url}/profile`, image);
    let data = await lastValueFrom(res);
    return data['url'];
  }

  // isLoggedIn() {
  //   return localStorage.getItem('accesstoken') != null;
  // }
  public isLoggedOut(): boolean {
    const token = localStorage.getItem('refreshtoken');
    return this.jwtHelper.isTokenExpired(token!);
  }

  public getUserProfile() {
    const token = localStorage.getItem('accesstoken');
    let payload;

    if (token) {
      // JWT is made of three parts divided by "." The center part contains the user details. So you get that with split and decode that part with window.atob
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    }

    return {};
  }

  public accessTokenExpired(): boolean {
    const token = localStorage.getItem('accesstoken');
    return this.jwtHelper.isTokenExpired(token!);
  }

  public getAccessToken() {
    return localStorage.getItem('accesstoken');
  }

  public logout() {
    localStorage.clear();
    const token = localStorage.getItem('accesstoken');
    if (token === null) {
      this.route.navigate(['authentication/login']);
    }
  }
  token: string | null = localStorage.getItem('refreshtoken');

  public async refreshToken(): Promise<Token> {
    const header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token!
    );
    let res = this.http.get<Token>(`${this.url}/authentication/refresh`, {
      headers: header,
    });

    // return res;
    let data = await lastValueFrom(res);

    localStorage.setItem('accesstoken', data.Tokens.accessToken),
      localStorage.setItem('refreshtoken', data.Tokens.refreshToken);

    return data;
  }
}
export let token: string | null = localStorage.getItem('refreshtoken');

// export let abc = token;
