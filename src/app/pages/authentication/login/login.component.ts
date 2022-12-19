import { AuthService } from 'src/app/shared/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from 'src/app/shared/dto/token.dto';
import { TokenInterceptorService } from 'src/app/shared/service/token-interceptor.service';
import { LooggedUser, UserDto } from 'src/app/shared/dto/user.dto';
import { UserService } from 'src/app/shared/service/user.service';

// export enum role {
//   USER = 0,
//   ADMIN = 1,
// }

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly route: Router
  ) {}

  result!: Token;
  response: any;
  show: boolean = false;
  tokenInfo!: LooggedUser;
  profile!: UserDto;

  credentialForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

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

  async submitCredentialForm() {
    this.result = await this.authService.login(this.credentialForm.value);

    console.log('Logged User', this.result);
    if (this.result != null) {
      localStorage.setItem('accesstoken', this.result.Tokens.accessToken);

      localStorage.setItem('refreshtoken', this.result.Tokens.refreshToken);

      this.tokenInfo = this.authService.getUserProfile();
      this.profile = await this.userService.getUser(this.tokenInfo.user);
      console.log('ROLE', this.profile.role);
      if (this.profile.role[0] === 0) {
        this.route.navigate(['user']);
      } else if (this.profile.role[0] === 1) {
        this.route.navigate(['admin/dashboard']);
      } else if (this.profile.role[0] === 2) {
        localStorage.clear();
        alert('Your Account is Ban Till a specific Time');
      } else {
        throw new Error('Users with this Role does not have access');
      }
    } else {
      throw new Error('User Access Denied');
    }
  }
}
