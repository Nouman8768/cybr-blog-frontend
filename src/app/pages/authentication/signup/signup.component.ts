import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/shared/dto/user.dto';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private readonly service: AuthService,
    private readonly route: Router
  ) {}

  show: boolean = false;
  result!: UserDto;
  file!: File;
  selectedImage!: string;

  signUpForm: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmpassword: new FormControl('', [Validators.required]),
    image: new FormControl(''),
    role: new FormControl(Number, [Validators.required]),
    refreshToken: new FormControl(''),
  });

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

  async submitAuthForm() {
    await this.submitImage();
    await this.signUpUser();
    await this.route.navigate(['login']);
  }

  async signUpUser(): Promise<UserDto> {
    if (
      this.signUpForm.value.password === this.signUpForm.value.confirmpassword
    ) {
      this.result = await this.service.signUp(this.signUpForm.value);
      console.log(this.result);
      return this.result;
    } else {
      console.log('Password Does Not Match');
      throw new Error('Passowrd Does Not Match');
    }
  }

  async submitImage() {
    if (this.selectedImage != undefined) {
      const formData = new FormData();
      formData.append('file', this.file);

      const uploadImage = await this.service.uploadProfileImage(formData);

      console.log('uploaded response: ', uploadImage);
    }
  }

  async attachFile(event: any) {
    this.file = (event.target as HTMLInputElement).files![0];
    this.signUpForm.patchValue({ image: this.file });
    const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    // this.signUpForm.get('image')?.updateValueAndValidity();
    if (this.file && allowedMimeTypes.includes(this.file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }
}
