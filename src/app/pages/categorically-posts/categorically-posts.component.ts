import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  result: PostSchema[] = [];
  // | paginate
  //                 : {
  //                     id: 'paginate',
  //                     itemsPerPage: 4,
  //                     currentPage: page,
  //                     totalItems: result.length
  //                   }
  page: number = 1;

  blogposts$: Observable<PostSchema[]> = this.activeroute.params.pipe(
    switchMap((param: Params) => {
      const postCategory: string = param['category'];
      return this.postService
        .getCategoryPosts(postCategory)
        .pipe(map((blogEntery: PostSchema[]) => blogEntery));
    })
  );
  ngOnInit(): void {
    // this.getAllPosts();
  }
  async getAllPosts() {
    const res = this.postService.getter();
    this.postService
      .getCategoryPosts(res.category)
      .subscribe((data: PostSchema[]) => {
        this.result = data;
        console.log(data);
      });
  }
  async sendDetailstoUpdatePage(details: PostSchema) {
    this.postService.setter(details);
    this.route.navigate(['update-post']);
  }
  async populateSinglePostData(details: PostSchema) {
    this.postService.setter(details);
    this.route.navigate([`single-post/${details.slug}`]);
  }
  async sendCategory(category: PostSchema) {
    this.postService.setter(category);
    this.route.navigate(['category-post']);
  }
  async deletePost(id: string, filename: string) {
    const deleted = await this.postService.deletePost(id);
    const unlinked = await this.postService.unlinkServerImage(filename);
    this.getAllPosts();
    console.log(deleted);
  }
}
