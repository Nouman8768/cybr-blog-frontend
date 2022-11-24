import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';
import { PostSchema } from '../post.schema';
import { PostService } from '../post.service';

@Component({
  selector: 'app-read-single-post',
  templateUrl: './read-single-post.component.html',
  styleUrls: ['./read-single-post.component.scss'],
})
export class ReadSinglePostComponent implements OnInit {
  constructor(
    private readonly postService: PostService,
    private readonly route: Router,
    private readonly activeroute: ActivatedRoute
  ) {}

  blogpost$!: Observable<PostSchema | any>;

  ngOnInit(): void {
    this.getAll();
  }

  async getAll() {
    this.blogpost$ = this.activeroute.params.pipe(
      switchMap((param: Params) => {
        const postSlug: string = param['id'];
        return this.postService.populateSinglePost(postSlug);
      })
    );
  }
  async sendCategory(category: PostSchema) {
    this.route.navigate([`category-post/${category.category}`]);
  }
}
