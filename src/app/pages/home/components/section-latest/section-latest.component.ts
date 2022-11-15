import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostSchema } from 'src/app/pages/Posts/post.schema';
import { PostService } from 'src/app/pages/Posts/post.service';

@Component({
  selector: 'app-section-latest',
  templateUrl: './section-latest.component.html',
  styleUrls: ['./section-latest.component.scss'],
})
export class SectionLatestComponent implements OnInit {
  constructor(private postService: PostService) {}

  result: PostSchema[] = [];

  ngOnInit(): void {
    this.postService.getPosts().subscribe((data: PostSchema[]) => {
      this.result = data;
      console.log('get posts: ', data);
    });
  }
}
