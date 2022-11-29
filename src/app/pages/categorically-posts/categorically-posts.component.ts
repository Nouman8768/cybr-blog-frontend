import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';
import { PostService } from 'src/app/shared/service/post.service';
import { Post } from '../../shared/dto/post.schema';

@Component({
  selector: 'app-categorically-posts',
  templateUrl: './categorically-posts.component.html',
  styleUrls: ['./categorically-posts.component.scss'],
})
export class CategoricallyPostsComponent implements OnInit {
  constructor(
    private readonly service: PostService,
    private readonly route: Router,
    private readonly activeroute: ActivatedRoute
  ) {}

  page: number = 1;
  blogposts$!: Observable<Post[] | any>;
  posts!: Post[];
  category!: string;

  ngOnInit(): void {
    this.getAllPosts();
    setTimeout(() => {
      const cPosts = document.querySelectorAll('.specific-category-posts');

      for (let i = 0; i < cPosts.length; i++) {
        const dots = document.querySelector(`.cp-dots${i}`) as HTMLElement;

        const options = document.querySelector(
          `.cp-options${i}`
        ) as HTMLElement;

        const deleteOptions = document.querySelector(
          `.cp-delete${i}`
        ) as HTMLElement;

        const deleteConfirmation = document.querySelector(
          `.cp-confirmation${i}`
        ) as HTMLElement;

        const No = document.querySelector(`.cp-No${i}`) as HTMLElement;

        dots?.addEventListener('click', () => {
          options!.classList.toggle('hidden');
          console.log(dots);
        });

        if (deleteOptions) {
          deleteOptions.addEventListener('click', () => {
            deleteConfirmation.style.display = 'flex';
          });
        }

        if (No) {
          No.addEventListener('click', () => {
            deleteConfirmation.style.display = 'none';
          });
        }
      }
    }, 800);
  }
  async getAllPosts() {
    this.blogposts$ = this.activeroute.params.pipe(
      switchMap((param: Params) => {
        const postCategory: string = param['category'];
        return this.service.findByCategory(postCategory).pipe(
          map((blogEntery: Post[]) => {
            this.posts = blogEntery;
            this.category = blogEntery[0].category;
          })
        );
      })
    );
  }
  async moveToUpdatePage(id: string) {
    this.route.navigate([`update/${id}`], {
      queryParams: { id: id },
    });
  }
  async moveToSinglePostPage(id: string) {
    this.route.navigate([`single-post/${id}`], {
      queryParams: { id: id },
    });
  }
  async deletePost(id: string, filename: string) {
    const deleted = await this.service.delete(id);
    const unlinked = await this.service.unlinkImagefromServer(filename);
    this.getAllPosts();
  }
}
