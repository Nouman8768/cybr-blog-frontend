import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  show = false;

  constructor() {}

  ngOnInit(): void {
    const show_icon = document.querySelector('.show-icon');
    var pass_input = document.querySelector('#pass-input') as HTMLElement;

    show_icon?.addEventListener('click', () => {
      pass_input.getAttribute('type') === 'password'
        ? pass_input.setAttribute('type', 'text')
        : pass_input.setAttribute('type', 'password');
      this.show = !this.show;
    });
  }
}
