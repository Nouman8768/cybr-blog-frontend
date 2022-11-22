import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostSchema } from '../Posts/post.schema';
import { PostService } from '../Posts/post.service';
import { Observable, switchMap, map } from 'rxjs';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {
  constructor(
    private readonly postService: PostService,
    private readonly route: Router,
    private readonly activeroute: ActivatedRoute
  ) {}

  post!: PostSchema;

  blogpost$: Observable<PostSchema> = this.activeroute.params.pipe(
    switchMap((param: Params) => {
      const postSlug: string = param['slug'];
      return this.postService
        .populateSinglePost(postSlug)
        .pipe(map((blogEntery: PostSchema) => blogEntery));
    })
  );
  ngOnInit(): void {
    this.post = this.postService.getter();
    console.log(this.post);
  }

  async sendCategory(category: PostSchema) {
    this.postService.setter(category);
    this.route.navigate(['category-post']);
  }
}
