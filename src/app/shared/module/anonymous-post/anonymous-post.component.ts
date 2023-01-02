import { map, Observable } from 'rxjs';
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
  anonymousPosts$!: Observable<Post[]>;

  async ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts() {
    this.anonymousPosts$ = this.postsService.findAll().pipe(
      map((data: Post[]) => {
        return data.slice(2, 3);
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
