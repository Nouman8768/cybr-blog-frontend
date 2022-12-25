import { AuthService } from '../../shared/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LooggedUser, UserDto } from 'src/app/shared/dto/user.dto';
import { Token } from 'src/app/shared/dto/token.dto';
import { UserService } from 'src/app/shared/service/user.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.profile.component.html',
  styleUrls: ['./user.profile.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly route: Router
  ) {}

  clicked: boolean = false;
  editClicked: boolean = false;

  editPic: boolean = false;
  show: boolean = false;
  visibleFields: boolean = false;
  result!: Token;
  tokenInfo!: LooggedUser;
  profile!: UserDto;
  userForm!: FormGroup;
  url: string = environment.serverUrl;

  file!: File;
  selectedImage!: string;

  ngOnInit() {
    this.loadProfile();
    const pass = document.querySelector('.pass-input') as HTMLInputElement;

    const con_pass = document.querySelector('#con-pass-input') as HTMLElement;

    const showIcon = document.querySelector('.show-icon') as HTMLElement;

    const edit = document.querySelector('.edit-profile') as HTMLButtonElement;

    let inputs = document.querySelectorAll('.input-field');

    if (showIcon) {
      showIcon.addEventListener('click', () => {
        pass!.getAttribute('type') === 'password'
          ? pass!.setAttribute('type', 'text')
          : pass!.setAttribute('type', 'password');

        con_pass.getAttribute('type') === 'password'
          ? con_pass.setAttribute('type', 'text')
          : con_pass.setAttribute('type', 'password');
      });
    }

    if (edit) {
      edit.addEventListener('click', () => {
        edit.style.display = 'none';
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].removeAttribute('disabled');
        }
      });
    }
  }

  async loadProfile() {
    this.tokenInfo = this.authService.getUserProfile();

    this.profile = await this.userService.getUser(this.tokenInfo.user);

    this.userForm = new FormGroup({
      firstname: new FormControl(this.profile.firstname, [Validators.required]),

      lastname: new FormControl(this.profile.lastname, [Validators.required]),

      username: new FormControl(this.profile.username, [Validators.required]),

      image: new FormControl(this.profile.image),

      role: new FormControl(0, [Validators.required]),
    });
  }

  async submitUpdateForm() {
    await this.submitImage();
    await this.updatePost();
    await this.route.navigate(['/']);
  }

  async updatePost(): Promise<UserDto> {
    console.log('Response Before', this.userForm.value);
    const response = await this.userService.updateProfile(
      this.profile._id,
      this.userForm.value
    );
    return response;
  }

  async submitImage() {
    if (this.selectedImage != undefined) {
      const formData = new FormData();
      formData.append('file', this.file);

      const unlinked = await this.userService.unlinkProfileImagefromServer(
        this.userForm.value.image
      );
      const uploadImage = await this.userService.uploadImage(formData);
      this.userForm.value.image = uploadImage;
    }
  }

  async attachFile(event: any) {
    this.file = (event.target as HTMLInputElement).files![0];
    const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    if (this.file && allowedMimeTypes.includes(this.file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(this.file);
    }
    this.clicked = true;
  }

  remove() {
    this.userForm.value.image = 'no-image.jpg';
    this.clicked = true;
  }
  cancle() {
    this.userForm.value.image = this.profile.image;
    this.clicked = false;
  }
  hideCanclebtn() {
    this.visibleFields = false;
    this.editClicked = false;
  }
}
