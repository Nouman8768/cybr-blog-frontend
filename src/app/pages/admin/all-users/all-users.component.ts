import { Observable } from 'rxjs';
import { UserDto } from './../../../shared/dto/user.dto';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent implements OnInit {
  constructor(private readonly userService: UserService) {}

  users$!: Observable<UserDto[]>;

  showActions: boolean = true;

  blockRes!: UserDto;

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.users$ = this.userService.findAll();
  }

  async dismissAsAdmin(id: string) {
    let res = await this.userService.dismissAsAdmin(id);
    console.log(res);
    this.get();
  }

  async makeAdmin(id: string) {
    let res = await this.userService.makeAdmin(id);
    console.log(res);
    this.get();
  }

  async blockUser(id: string) {
    this.blockRes = await this.userService.blockUser(id);
    console.log(this.blockRes);
    this.get();
  }

  closeActions(event: any) {
    if (!event.target.className.includes('user-options')) {
      this.showActions = false;
      console.log('clicked');
    }
  }

  closeModal(event: any) {
    if (event.target.className.includes('details-modal')) {
      this.showActions = false;
    }
  }

  trackByFunc(index: number, user: UserDto) {
    return user._id;
  }
}
