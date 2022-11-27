import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  show: boolean = false;
  constructor() {}

  ngOnInit(): void {
    const show_icon = document.querySelector('.show-icon');
    let pass_input = document.querySelector('#pass-input') as HTMLElement;
    let con_input = document.querySelector('#con-pass-input') as HTMLElement;

    show_icon?.addEventListener('click', () => {
      pass_input.getAttribute('type') === 'password'
        ? pass_input.setAttribute('type', 'text')
        : pass_input.setAttribute('type', 'password');

      con_input.getAttribute('type') === 'password'
        ? con_input.setAttribute('type', 'text')
        : con_input.setAttribute('type', 'password');
      this.show = !this.show;
    });
  }
}
