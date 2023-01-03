import { map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Post } from 'src/app/shared/dto/post.schema';

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
  sidebarPosts$!: Observable<Post[]>;

  async ngOnInit() {
    this.getAllPosts();
  }

  getAllPosts() {
    this.sidebarPosts$ = this.postsService.findAll().pipe(
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
