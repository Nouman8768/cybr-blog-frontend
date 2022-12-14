import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  NavigationEnd,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LooggedUser, UserDto } from '../dto/user.dto';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { filter } from 'rxjs/operators';
import { SharedFunctionsService } from '../service/shared-functions.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly route: Router
  ) {}
  user!: UserDto;

  async canActivate() {
    if (this.authService.accessToken_NotExpired()) {
      return true;
    } else {
      localStorage.clear();
      alert('Access Denied Token Not Found');
      this.route.navigate(['/login']);
      return false;
    }
  }
}
