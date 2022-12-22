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

  users: UserDto[] = [];

  arr: number[] = [];

  showActions: boolean = true;

  ngOnInit(): void {
    for (let index = 0; index < 50; index++) {
      this.arr.push(1);
    }
    this.get();
  }

  get() {
    this.userService.findAll().subscribe((res: UserDto[]) => {
      this.users = res;
      console.log('USERS', this.users);
    });
  }

  async dismissAsAdmin(id: string) {
    let res = await this.userService.dismissAsAdmin(id);
    console.log(res);
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
}
