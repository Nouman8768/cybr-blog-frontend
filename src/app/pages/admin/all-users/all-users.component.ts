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

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.userService.findAll().subscribe((res: UserDto[]) => {
      this.users = res;
      console.log('USERS', this.users);
    });
  }
}
