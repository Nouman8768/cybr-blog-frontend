import { Component, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showheader!: boolean;
  constructor(private readonly route: Router) {
    route.events.subscribe((path) => {
      if (path instanceof NavigationEnd) {
        if (
          path.url === '/login' ||
          path.url === '/signup' ||
          path.url === '/my-profile' ||
          path.url === '/admin' ||
          path.url === '/admin/dashboard' ||
          path.url === '/admin/allusers'
        ) {
          this.showheader = false;
        } else {
          this.showheader = true;
        }
      }
    });
  }

  ngOnInit(): void {}

  rootPath() {
    return this.route.url === '/';
  }
}
