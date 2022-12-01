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
  canActivate(): boolean {
    if (!this.service.isLoggedIn()) {
      this.route.navigate(['authentication/login']);
      alert('Access Denied');
      return false;
    } else {
      return true;
    }
  }
}
