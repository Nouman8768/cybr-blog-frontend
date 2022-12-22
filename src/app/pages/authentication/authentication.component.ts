import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  constructor(private readonly route: Router) {}

  ngOnInit(): void {
    if (this.authRoute()) {
      this.route.navigate(['/']);
    }
  }

  authRoute() {
    return this.route.url.includes('authentication');
  }
}
