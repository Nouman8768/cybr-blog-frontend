import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/pages/authentication/login/login.component';
import { Post } from 'src/app/shared/dto/post.schema';
import { AuthService } from 'src/app/shared/service/auth.service';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-popular-sidebar-posts',
  templateUrl: './popular-sidebar-posts.component.html',
  styleUrls: ['./popular-sidebar-posts.component.scss'],
})
export class PopularSidebarPostsComponent implements OnInit {
  constructor(
    private readonly postsService: PostService,
    private readonly route: Router
  ) {}

  confirmationState: boolean = true;
  sidebarPosts: Post[] = [];

  async ngOnInit() {
    await this.getAllPosts();
  }

  getAllPosts() {
    this.postsService.findAll().subscribe((data: Post[]) => {
      this.sidebarPosts = data.slice(0, 4);
    });
  }

  async moveToSinglePostPage(id: string) {
    this.route.navigate([`single-post/${id}`], {
      queryParams: { id: id },
    });
  }

  async moveToAuthorPostsPage(author: string) {
    this.route.navigate([`author-posts/${author}`], {
      queryParams: { author: author },
    });
  }
}
