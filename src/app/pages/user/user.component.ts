import { AuthService } from './../../shared/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LooggedUser } from 'src/app/shared/dto/user.dto';
import { Token } from 'src/app/shared/dto/token.dto';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  editPic: boolean = false;
  show: boolean = false;
  visibleFields: boolean = false;
  result!: Token;
  profile!: LooggedUser;
  userForm!: FormGroup;

  ngOnInit() {
    this.loadProfile();

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

  loadProfile() {
    this.profile = this.authService.getUserProfile();

    this.userForm = new FormGroup({
      firstname: new FormControl(this.profile.user.firstname, [
        Validators.required,
      ]),

      lastname: new FormControl(this.profile.user.lastname, [
        Validators.required,
      ]),

      username: new FormControl(this.profile.user.username, [
        Validators.required,
      ]),

      password: new FormControl(this.profile.user.password, [
        Validators.required,
      ]),

      confirmpassword: new FormControl(this.profile.user.confirmpassword, [
        Validators.required,
      ]),

      image: new FormControl(this.profile.user.image),

      role: new FormControl(0, [Validators.required]),
    });
  }

  loggedOut() {
    this.authService.logout();
  }
}
