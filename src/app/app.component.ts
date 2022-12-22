import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly route: Router) {}
  title = 'cybr-blog';

  isLoginPage: boolean = true;
  authState: boolean = false;
  mobileNavState: boolean = false;

  ngOnInit(): void {}

  adminRoute() {
    return this.route.url.includes('admin');
  }
  recieveState(state: boolean) {
    this.mobileNavState = false;
  }
}
