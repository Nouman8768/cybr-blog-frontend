import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-mobile-navigation',
  templateUrl: './admin-mobile-navigation.component.html',
  styleUrls: ['./admin-mobile-navigation.component.scss'],
})
export class AdminMobileNavigationComponent implements OnInit {
  constructor() {}

  mobileState: boolean = false;
  showUserSubmenu: boolean = false;
  showDriverSubmenu: boolean = false;
  @Output() mnState = new EventEmitter<boolean>();

  ngOnInit(): void {}

  sendState(value: boolean) {
    this.mnState.emit(value);
  }

  logout() {
    // this._authService.logout();
  }
}
