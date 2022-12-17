import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly route: Router,
    private readonly jwtHelper: JwtHelperService
  ) {}
  async canActivate() {
    if (this.authService.isLoggedOut()) {
      localStorage.clear();
      this.route.navigate(['/login']);
      alert('Access Denied Token Not Found');
      return false;
    } else {
      return true;
    }
  }
}
