import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  constructor(private readonly route: Router) {}

  authState: boolean = false;
  mobileNavState: boolean = false;
  isLoginPage: boolean = false;

  ngOnInit(): void {}

  recieveState(state: boolean) {
    this.mobileNavState = false;
  }

  dashRoute() {
    return this.route.url === 'dashboard';
  }
  allUserRoute() {
    return this.route.url === '/admin/alluser';
  }
}
