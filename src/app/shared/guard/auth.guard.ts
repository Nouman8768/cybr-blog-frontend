import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LooggedUser, UserDto } from '../dto/user.dto';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly route: Router
  ) {}

  user!: UserDto;

  async canActivate() {
    if (!this.authService.isLoggedOut()) {
      let res: LooggedUser = this.authService.getUserProfile();
      this.user = await this.userService.getUser(res.user);
      if (this.user.role[0] === 0) {
        alert('Access Denied! Only Admin Has Access');
        this.route.navigate(['/']);
        return false;
      } else {
        return true;
      }
    } else if (this.authService.isLoggedOut()) {
      localStorage.clear();
      alert('Access Denied Token Not Found');
      this.route.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.canActivate();
  }
}
