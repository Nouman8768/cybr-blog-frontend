import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostSchema } from '../Posts/post.schema';
import { PostService } from '../Posts/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {
  constructor(
    private readonly postService: PostService,
    private readonly route: Router
  ) {}

  post!: PostSchema;

  ngOnInit(): void {
    this.post = this.postService.getter();
    console.log(this.post);
  }

  async sendCategory(category: PostSchema) {
    this.postService.setter(category);
    this.route.navigate(['category-post']);
  }
}
