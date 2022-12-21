import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';
import { Post } from 'src/app/shared/dto/post.schema';
import { AuthService } from 'src/app/shared/service/auth.service';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  constructor(
    private readonly postsService: PostService,
    private readonly authService: AuthService,
    private readonly route: Router,
    private readonly activeroute: ActivatedRoute
  ) {}

  showdots: boolean = false;
  page: number = 1;
  blogposts$!: Observable<Post[] | any>;
  posts!: Post[];
  category!: string;

  ngOnInit(): void {
    this.getAllPosts();
    // setTimeout(() => {
    //   const cPosts = document.querySelectorAll('.specific-category-posts');

    //   for (let i = 0; i < cPosts.length; i++) {
    //     const dots = document.querySelector(`.upo-dots${i}`) as HTMLElement;

    //     const options = document.querySelector(
    //       `.upo-options${i}`
    //     ) as HTMLElement;

    //     const deleteOptions = document.querySelector(
    //       `.upo-delete${i}`
    //     ) as HTMLElement;

    //     const deleteConfirmation = document.querySelector(
    //       `.upo-confirmation${i}`
    //     ) as HTMLElement;

    //     const No = document.querySelector(`.upo-No${i}`) as HTMLElement;

    //     dots?.addEventListener('click', () => {
    //       options!.classList.toggle('hidden');
    //       console.log(dots);
    //     });

    //     if (deleteOptions) {
    //       deleteOptions.addEventListener('click', () => {
    //         deleteConfirmation.style.display = 'flex';
    //       });
    //     }

    //     if (No) {
    //       No.addEventListener('click', () => {
    //         deleteConfirmation.style.display = 'none';
    //       });
    //     }
    //   }
    // }, 800);
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
