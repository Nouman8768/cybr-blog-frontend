import { map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/dto/post.schema';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-column-post',
  templateUrl: './column-post.component.html',
  styleUrls: ['./column-post.component.scss'],
})
export class ColumnPostComponent implements OnInit {
  constructor(
    private readonly postsService: PostService,
    private readonly route: Router
  ) {}

  confirmationState: boolean = true;
  columnPosts$!: Observable<Post[]>;

  async ngOnInit() {
    await this.getAllPosts();
  }

  async getAllPosts() {
    this.columnPosts$ = this.postsService.findAll().pipe(
      map((data) => {
        return data.slice(0, 2);
      })
    );
  }

  async moveToSinglePostPage(id: string) {
    this.route.navigate([`single-post/${id}`], {
      queryParams: { id: id },
    });
  }

  async moveToCategoryPostPage(category: string) {
    this.route.navigate([`category-post/${category}`], {
      queryParams: { category: category },
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
