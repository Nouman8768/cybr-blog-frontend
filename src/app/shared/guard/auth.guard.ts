import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly service: AuthService,
    private readonly route: Router
  ) {}
  canActivate() {
    if (this.service.isLoggedIn()) {
      return true;
    } else {
      this.route.navigate(['login']);
      alert('User Logged In Failed');
      return false;
    }
    return true;
  }
}
