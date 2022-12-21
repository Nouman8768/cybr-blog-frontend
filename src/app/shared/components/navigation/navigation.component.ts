import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}
  showUserProfileOptions: boolean = false;
  optionsAfter_UserLogsIn!: boolean;

  ngOnInit(): void {
    this.showoptionsAfter_UserLogsIn();
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
}
