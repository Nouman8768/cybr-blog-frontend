import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';
import { Post } from 'src/app/shared/dto/post.schema';
import { AuthService } from 'src/app/shared/service/auth.service';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  constructor(
    private readonly postsService: PostService,
    private readonly authService: AuthService,
    private readonly activeroute: ActivatedRoute,
    private readonly route: Router
  ) {}

  page: number = 1;
  blogposts$!: Observable<Post[] | any>;
  posts!: Post[];
  searchedText!: string;

  ngOnInit(): void {
    this.getAllPosts();
  }
  async getAllPosts() {
    this.blogposts$ = this.activeroute.params.pipe(
      switchMap((param: Params) => {
        const searchedText: string = param['text'];
        return this.postsService.search(searchedText).pipe(
          map((res: Post[]) => {
            this.posts = res;
            this.searchedText = searchedText;
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
