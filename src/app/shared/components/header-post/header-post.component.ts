import { AuthService } from 'src/app/shared/service/auth.service';
import { map, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/dto/post.schema';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-header-post',
  templateUrl: './header-post.component.html',
  styleUrls: ['./header-post.component.scss'],
})
export class HeaderPostComponent implements OnInit {
  constructor(
    private readonly postService: PostService,
    private readonly authService: AuthService,
    private readonly route: Router
  ) {}

  showdots: boolean = false;

  options: boolean = false;
  confirmationState: boolean = true;
  columnPosts$!: Observable<Post[]>;

  async ngOnInit() {
    this.showDots();
    this.getAllPosts();

    setTimeout(() => {
      const cPosts = document.querySelectorAll('.header-post');

      for (let i = 0; i < cPosts.length; i++) {
        const dots = document.querySelector(`.hdots${i}`) as HTMLElement;

        const options = document.querySelector(`.hoptions${i}`) as HTMLElement;

        const deleteOptions = document.querySelector(
          `.hdelete${i}`
        ) as HTMLElement;

        const deleteConfirmation = document.querySelector(
          `.hdeleteOP${i}`
        ) as HTMLElement;

        const No = document.querySelector(`.hNo${i}`) as HTMLElement;

        dots?.addEventListener('click', () => {
          options!.classList.toggle('hidden');
        });

        deleteOptions.addEventListener('click', () => {
          deleteConfirmation.style.display = 'flex';
        });

        No.addEventListener('click', () => {
          deleteConfirmation.style.display = 'none';
        });
      }
    }, 800);
  }

  getAllPosts() {
    this.columnPosts$ = this.postService.findAll().pipe(
      map((data) => {
        return data.slice(0, 3).reverse();
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

  async moveToCategoryPostPage(category: string) {
    this.route.navigate([`category-post/${category}`], {
      queryParams: { category: category },
    });
  }

  async moveToAuthorPostsPage(author: string) {
    this.route.navigate([`author-posts/${author}`], {
      queryParams: { author: author },
    });
  }

  async deletePost(id: string, filename: string) {
    const deleted = await this.postService.delete(id);
    const unlinked = await this.postService.unlinkImagefromServer(filename);
    this.getAllPosts();
  }

  showDots() {
    if (this.authService.accessToken_NotExpired()) {
      this.showdots = true;
    } else {
      this.showdots;
    }
  }

  trackByFunc(index: number, post: Post) {
    return post._id;
  }
}
