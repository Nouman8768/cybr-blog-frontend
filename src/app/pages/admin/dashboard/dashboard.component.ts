import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/service/post.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private readonly userService: UserService,
    private readonly postsService: PostService
  ) {}

  usersCounted!: number;
  postsCounted!: number;

  async ngOnInit(): Promise<void> {
    await this.totalNumberOfUsers();
    await this.totalNumberOfPosts();
  }

  async totalNumberOfUsers(): Promise<number> {
    this.usersCounted = await this.userService.count();
    console.log(this.usersCounted);
    return this.usersCounted;
  }

  async totalNumberOfPosts(): Promise<number> {
    this.postsCounted = await this.postsService.count();
    console.log(this.postsCounted);
    return this.postsCounted;
  }
}
