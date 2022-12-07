import { AuthService } from './../../shared/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LooggedUser, UserDto } from 'src/app/shared/dto/user.dto';
import { Token } from 'src/app/shared/dto/token.dto';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  editPic: boolean = false;
  show: boolean = false;
  visibleFields: boolean = false;
  result!: Token;
  tokenInfo!: LooggedUser;
  profile!: UserDto;
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

  async loadProfile() {
    this.tokenInfo = this.authService.getUserProfile();
    console.log(this.tokenInfo.user);
    this.profile = await this.userService.getUser(this.tokenInfo.user);
    console.log('User', this.profile);

    this.userForm = new FormGroup({
      firstname: new FormControl(this.profile.firstname, [Validators.required]),

      lastname: new FormControl(this.profile.lastname, [Validators.required]),

      username: new FormControl(this.profile.username, [Validators.required]),

      password: new FormControl(this.profile.password, [Validators.required]),

      confirmpassword: new FormControl(this.profile.confirmpassword, [
        Validators.required,
      ]),

      image: new FormControl(this.profile.image),

      role: new FormControl(0, [Validators.required]),
    });
  }

  loggedOut() {
    this.authService.logout();
  }
}
