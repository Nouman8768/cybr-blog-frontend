import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LooggedUser, UserDto } from '../dto/user.dto';
import { AuthService } from '../service/auth.service';
import { SharedFunctionsService } from '../service/shared-functions.service';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly shared_Func_Service: SharedFunctionsService,

    private readonly route: Router
  ) {}

  user!: UserDto;

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    if (this.authService.accessToken_NotExpired()) {
      this.user = await this.shared_Func_Service.loadProdile();

      if (this.user.role[0] === 1) {
        return true;
      } else {
        this.route.navigate(['/']);
        return false;
      }
    } else if (this.authService.accessToken_Expired()) {
      localStorage.clear();
      alert('Access Denied Token Not Found');
      this.route.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
