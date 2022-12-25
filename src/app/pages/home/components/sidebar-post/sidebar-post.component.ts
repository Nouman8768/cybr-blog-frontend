import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/dto/post.schema';
import { AuthService } from 'src/app/shared/service/auth.service';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-sidebar-post',
  templateUrl: './sidebar-post.component.html',
  styleUrls: ['./sidebar-post.component.scss'],
})
export class SidebarPostComponent implements OnInit {
  constructor(
    private readonly postsService: PostService,
    private readonly authService: AuthService,
    private readonly route: Router
  ) {}

  confirmationState: boolean = true;
  sidebarPosts: Post[] = [];

  async ngOnInit() {
    await this.getAllPosts();
  }

  async getAllPosts() {
    this.postsService.findAll().subscribe((data: Post[]) => {
      this.sidebarPosts = data.slice(2, 6);
    });
  }

  async moveToSinglePostPage(id: string) {
    this.route.navigate([`single-post/${id}`], {
      queryParams: { id: id },
    });
  }
}
