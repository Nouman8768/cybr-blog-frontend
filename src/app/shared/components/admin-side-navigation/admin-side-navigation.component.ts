import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-admin-side-navigation',
  templateUrl: './admin-side-navigation.component.html',
  styleUrls: ['./admin-side-navigation.component.scss'],
})
export class AdminSideNavigationComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  showUserSubmenu: boolean = false;
  showDriverSubmenu: boolean = false;
  openMenu: boolean = true;
  closeMenu: boolean = false;

  ngOnInit(): void {
    window.addEventListener('resize', (e: UIEvent) => {
      const w = e.target as Window;
      if (w.innerWidth >= 1024) {
        this.openMenu = true;
      } else {
        this.openMenu = false;
      }
    });

    if (window.innerWidth <= 1024) {
      this.openMenu = false;
    }
  }

  logout() {
    this.authService.logout();
  }

  isCloseMenu() {
    if (window.innerWidth <= 1024) {
      this.openMenu = false;
    }
  }
}
