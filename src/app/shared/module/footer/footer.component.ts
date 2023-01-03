import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
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
  footerPosts$!: Observable<Post[]>;

  async ngOnInit() {
    await this.getAllPosts();
  }

  async getAllPosts() {
    this.footerPosts$ = this.postsService.findAll().pipe(
      map((data) => {
        return data.slice(0, 4);
      })
    );
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

  trackByFunc(index: number, post: Post) {
    return post._id;
  }
}
