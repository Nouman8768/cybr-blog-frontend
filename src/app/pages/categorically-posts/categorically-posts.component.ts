import { Component, OnInit } from '@angular/core';
import { PostSchema } from '../Posts/post.schema';
import { PostService } from '../Posts/post.service';

@Component({
  selector: 'app-categorically-posts',
  templateUrl: './categorically-posts.component.html',
  styleUrls: ['./categorically-posts.component.scss'],
})
export class CategoricallyPostsComponent implements OnInit {
  constructor(private readonly service: PostService) {}

  result: PostSchema[] = [];
  page: number = 1;
  ngOnInit(): void {
    const res = this.service.getter();
    this.service
      .getCategoryPosts(res.category)
      .subscribe((data: PostSchema[]) => {
        this.result = data;
        console.log(data);
      });
  }
}
