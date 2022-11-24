import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';
import { PostSchema } from '../Posts/post.schema';
import { PostService } from '../Posts/post.service';

@Component({
  selector: 'app-categorically-posts',
  templateUrl: './categorically-posts.component.html',
  styleUrls: ['./categorically-posts.component.scss'],
})
export class CategoricallyPostsComponent implements OnInit {
  constructor(
    private readonly postService: PostService,
    private readonly route: Router,
    private readonly activeroute: ActivatedRoute
  ) {}

  page: number = 1;
  blogposts$!: Observable<PostSchema[] | any>;

  ngOnInit(): void {
    this.getAllPosts();
  }
  async getAllPosts() {
    this.blogposts$ = this.activeroute.params.pipe(
      switchMap((param: Params) => {
        const postCategory: string = param['category'];
        return this.postService
          .getCategoryPosts(postCategory)
          .pipe(map((blogEntery: PostSchema[]) => blogEntery));
      })
    );
  }
  async sendDetailstoUpdatePage(details: PostSchema) {
    this.route.navigate([`update/${details._id}`]);
  }
  async populateSinglePostData(details: PostSchema) {
    this.route.navigate([`single-post/${details._id}`]);
  }
  async deletePost(id: string, filename: string) {
    const deleted = await this.postService.deletePost(id);
    const unlinked = await this.postService.unlinkServerImage(filename);
    this.getAllPosts();
  }
}
