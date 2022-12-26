import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/dto/post.schema';
import { AuthService } from '../../service/auth.service';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(
    private readonly postsService: PostService,
    private readonly route: Router
  ) {}

  confirmationState: boolean = true;
  fpPosts!: Post[];

  async ngOnInit() {
    await this.getAllPosts();
  }

  async getAllPosts() {
    this.postsService.findAll().subscribe((data: Post[]) => {
      this.fpPosts = data.slice(0, 4);
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
