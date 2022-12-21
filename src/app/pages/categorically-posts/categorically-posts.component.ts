import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';
import { AuthService } from 'src/app/shared/service/auth.service';
import { PostService } from 'src/app/shared/service/post.service';
import { Post } from '../../shared/dto/post.schema';

@Component({
  selector: 'app-categorically-posts',
  templateUrl: './categorically-posts.component.html',
  styleUrls: ['./categorically-posts.component.scss'],
})
export class CategoricallyPostsComponent implements OnInit {
  constructor(
    private readonly postsService: PostService,
    private readonly authService: AuthService,
    private readonly activeroute: ActivatedRoute,
    private readonly route: Router
  ) {}

  showdots: boolean = false;

  page: number = 1;
  blogposts$!: Observable<Post[] | any>;
  posts!: Post[];
  category!: string;

  ngOnInit(): void {
    this.getAllPosts();

    this.showDots();

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
        return this.postsService.findByCategory(postCategory).pipe(
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
    const deleted = await this.postsService.delete(id);
    const unlinked = await this.postsService.unlinkImagefromServer(filename);
    this.getAllPosts();
  }

  showDots() {
    if (this.authService.tokenNotExpired()) {
      this.showdots = true;
    } else {
      this.showdots;
    }
  }
}
