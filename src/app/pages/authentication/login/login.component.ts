import { User } from 'src/app/shared/dto/user.dto';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from 'src/app/shared/dto/token.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private readonly service: AuthService,
    private readonly route: Router
  ) {}

  result!: Token;
  response: any;
  show: boolean = false;

  credentialForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    // console.log(this.result);
    // setTimeout(() => {
    //   console.log(this.result);
    //   console.log(this.result.accessToken);
    //   console.log(this.result.refreshToken);
    // }, 40000);
    // setTimeout(() => {
    //   if (this.result === null) {
    //     // console.log(this.result.accessToken);
    //     // console.log(this.result.refreshToken);

    //     alert('Session Expired');
    //   } else {
    //     alert('Session Did Not Expired');
    //     console.log(this.result);
    //     console.log(this.result.accessToken);
    //     console.log(this.result.refreshToken);
    //   }
    // }, 70000);
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
    this.result = await this.service.login(this.credentialForm.value);

    console.log('Logged User', this.result);
    if (this.result != null) {
      localStorage.setItem('accesstoken', this.result.Tokens.accessToken);
      // this.route.navigate(['/']);
    } else {
      throw new Error('User Access Denied');
    }
  }
}
