import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LooggedUser, UserDto } from '../../dto/user.dto';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}
  showUserProfileOptions: boolean = false;
  optionsAfter_UserLogsIn!: boolean;

  tokenInfo!: LooggedUser;
  profile!: UserDto;

  async ngOnInit(): Promise<void> {
    this.showoptionsAfter_UserLogsIn();
    await this.loadProfile();
  }

  showoptionsAfter_UserLogsIn() {
    if (this.authService.tokenNotExpired()) {
      this.optionsAfter_UserLogsIn = true;
    } else {
      this.optionsAfter_UserLogsIn = false;
    }
  }
  loggedOut() {
    this.authService.logout();
  }

  async loadProfile() {
    if (this.authService.tokenNotExpired()) {
      this.tokenInfo = await this.authService.getUserProfile();

      this.profile = await this.userService.getUser(this.tokenInfo.user);
    }
  }
}
