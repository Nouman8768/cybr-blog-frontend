import { environment } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap, map } from 'rxjs';
import { Post } from 'src/app/shared/dto/post.schema';
import { AuthService } from 'src/app/shared/service/auth.service';
import { PostService } from 'src/app/shared/service/post.service';
import { LoginComponent } from '../../authentication/login/login.component';
import { UserService } from 'src/app/shared/service/user.service';
import { LooggedUser } from 'src/app/shared/dto/user.dto';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
})
export class UserPostsComponent implements OnInit {
  constructor(
    private readonly postsService: PostService,
    private readonly authService: AuthService,
    private readonly userService: UserService,

    private readonly route: Router,
    private readonly activeroute: ActivatedRoute
  ) {}

  showdots: boolean = false;
  page: number = 1;
  blogposts$!: Observable<Post[] | any>;
  posts!: Post[];
  category!: string;
  global!: number;

  loggedUserId!: LooggedUser;

  ngOnInit(): void {
    // this.getAllPosts();

    this.showDots();

    this.getUserPosts();

    setTimeout(() => {
      const cPosts = document.querySelectorAll('.specific-category-posts');

      for (let i = 0; i < cPosts.length; i++) {
        const dots = document.querySelector(`.upo-dots${i}`) as HTMLElement;

        const options = document.querySelector(
          `.upo-options${i}`
        ) as HTMLElement;

        const deleteOptions = document.querySelector(
          `.upo-delete${i}`
        ) as HTMLElement;

        const deleteConfirmation = document.querySelector(
          `.upo-confirmation${i}`
        ) as HTMLElement;

        const No = document.querySelector(`.upo-No${i}`) as HTMLElement;

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
  // async getAllPosts() {
  //   this.blogposts$ = this.activeroute.params.pipe(
  //     switchMap((param: Params) => {
  //       const postCategory: string = param['category'];
  //       return this.postsService.findByCategory(postCategory).pipe(
  //         map((blogEntery: Post[]) => {
  //           this.posts = blogEntery;
  //           this.category = blogEntery[0].category;
  //         })
  //       );
  //     })
  //   );
  // }
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
    // this.getAllPosts();
  }

  async getUserPosts() {
    this.loggedUserId = this.authService.getUserProfile();

    this.userService
      .getUserPosts(this.loggedUserId.user)
      .subscribe((data: Post[]) => {
        console.log(data);

        this.posts = data;
      });
  }

  showDots() {
    if (this.authService.tokenNotExpired() && this.global) {
      this.showdots = true;
    } else {
      this.showdots;
    }
  }
}
