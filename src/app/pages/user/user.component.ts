import { AuthService } from './../../shared/service/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private readonly service: AuthService) {}

  editPic: boolean = false;
  show: boolean = false;
  visibleFields: boolean = false;

  ngOnInit(): void {
    const pass = document.querySelector('.pass-input') as HTMLInputElement;
    const con_pass = document.querySelector('#con-pass-input') as HTMLElement;
    const showIcon = document.querySelector('.show-icon') as HTMLElement;
    const edit = document.querySelector('.edit-profile') as HTMLButtonElement;

    let inputs = document.querySelectorAll('.input-field');

    showIcon.addEventListener('click', () => {
      pass!.getAttribute('type') === 'password'
        ? pass!.setAttribute('type', 'text')
        : pass!.setAttribute('type', 'password');

      con_pass.getAttribute('type') === 'password'
        ? con_pass.setAttribute('type', 'text')
        : con_pass.setAttribute('type', 'password');
    });
    edit.addEventListener('click', () => {
      edit.style.display = 'none';
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].removeAttribute('disabled');
      }
    });
  }

  async loggedOut() {
    const out = await this.service.logout();
    console.log(out);
  }
}
