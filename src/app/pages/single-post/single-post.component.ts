import { Component, OnInit } from '@angular/core';
import { PostSchema } from '../Posts/post.schema';
import { PostService } from '../Posts/post.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss'],
})
export class SinglePostComponent implements OnInit {
  constructor(private readonly service: PostService) {}

  post!: PostSchema;

  ngOnInit(): void {
    this.post = this.service.getter();
    console.log(this.post);
  }
}
