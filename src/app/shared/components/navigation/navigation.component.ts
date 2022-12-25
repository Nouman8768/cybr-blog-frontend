import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LooggedUser, UserDto } from '../../dto/user.dto';
import { AuthService } from '../../service/auth.service';
import { SharedFunctionsService } from '../../service/shared-functions.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly shared_Func_Service: SharedFunctionsService
  ) {}
  showUserProfileOptions: boolean = false;
  optionsAfter_UserLogsIn!: boolean;

  tokenInfo!: LooggedUser;
  profile!: UserDto;

  async ngOnInit(): Promise<void> {
    this.showoptionsAfter_UserLogsIn();
    await this.userProfile();
  }

  showoptionsAfter_UserLogsIn() {
    if (this.authService.accessToken_NotExpired()) {
      this.optionsAfter_UserLogsIn = true;
    } else {
      this.optionsAfter_UserLogsIn = false;
    }
  }
  loggedOut() {
    this.authService.logout();
  }

  async userProfile() {
    if (this.authService.accessToken_NotExpired()) {
      this.profile = await this.shared_Func_Service.loadProdile();
    }
  }
}
