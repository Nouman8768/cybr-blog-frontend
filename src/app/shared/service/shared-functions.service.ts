import { Injectable } from '@angular/core';
import { LooggedUser, UserDto } from '../dto/user.dto';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class SharedFunctionsService {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}
  user!: UserDto;

  async loadProdile(): Promise<UserDto> {
    let res: LooggedUser = await this.authService.getUserProfile();

    this.user = await this.userService.getUser(res.user);

    console.log('USER_Shared_Func_Sevice', this.user);

    return this.user;
  }
}
