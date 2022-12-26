import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';
import { Post } from 'src/app/shared/dto/post.schema';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-author-posts',
  templateUrl: './author-posts.component.html',
  styleUrls: ['./author-posts.component.scss'],
})
export class AuthorPostsComponent implements OnInit {
  constructor(
    private readonly postsService: PostService,
    private readonly activeroute: ActivatedRoute,
    private readonly route: Router
  ) {}

  page: number = 1;
  blogposts$!: Observable<Post[] | any>;
  posts!: Post[];
  author!: string;

  ngOnInit(): void {
    this.getAllPosts();
  }

  async getAllPosts() {
    this.blogposts$ = this.activeroute.params.pipe(
      switchMap((param: Params) => {
        const postCategory: string = param['author'];
        return this.postsService.getByAuthorPosts(postCategory).pipe(
          map((blogEntery: Post[]) => {
            this.posts = blogEntery;
            console.log('AUTHOR', blogEntery);

            this.author = blogEntery[0].author.firstname;
          })
        );
      })
    );
  }

  async moveToSinglePostPage(id: string) {
    this.route.navigate([`single-post/${id}`], {
      queryParams: { id: id },
    });
  }
}
