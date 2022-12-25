import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';
import { PostService } from 'src/app/shared/service/post.service';
import { Post } from '../../../shared/dto/post.schema';

@Component({
  selector: 'app-read-single-post',
  templateUrl: './read-single-post.component.html',
  styleUrls: ['./read-single-post.component.scss'],
})
export class ReadSinglePostComponent implements OnInit {
  constructor(
    private readonly postsService: PostService,
    private readonly activeroute: ActivatedRoute,
    private readonly route: Router
  ) {}

  blogpost$!: Observable<Post | any>;

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    this.blogpost$ = this.activeroute.params.pipe(
      switchMap((param: Params) => {
        const postSlug: string = param['id'];
        return this.postsService.findOne(postSlug);
      })
    );
  }
  async moveToCategoryPostPage(category: string) {
    this.route.navigate([`category-post/${category}`], {
      queryParams: { category: category },
    });
  }
}
