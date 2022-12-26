import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/dto/post.schema';
import { AuthService } from '../../service/auth.service';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-anonymous-post',
  templateUrl: './anonymous-post.component.html',
  styleUrls: ['./anonymous-post.component.scss'],
})
export class AnonymousPostComponent implements OnInit {
  constructor(
    private readonly postsService: PostService,
    private readonly route: Router
  ) {}

  confirmationState: boolean = true;
  anonymousPosts: Post[] = [];

  async ngOnInit() {
    await this.getAllPosts();
  }

  getAllPosts() {
    this.postsService.findAll().subscribe((data: Post[]) => {
      this.anonymousPosts = data.slice(2, 3);
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
