import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '../dto/token.dto';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly service: AuthService,
    private readonly route: Router,
    private readonly jwtHelper: JwtHelperService
  ) {}
  async canActivate() {
    if (this.service.isLoggedOut()) {
      localStorage.clear();
      this.route.navigate(['authentication/login']);
      alert('Access Denied');
      return false;
    } else {
      // this.route.navigate(['authentication/login']);
      return true;
    }
  }
}
