import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/dto/post.schema';
import { AuthService } from 'src/app/shared/service/auth.service';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-column-post',
  templateUrl: './column-post.component.html',
  styleUrls: ['./column-post.component.scss'],
})
export class ColumnPostComponent implements OnInit {
  constructor(
    private readonly postsService: PostService,
    private readonly authService: AuthService,
    private readonly route: Router
  ) {}

  showdots: boolean = false;

  confirmationState: boolean = true;
  columnPosts: Post[] = [];

  async ngOnInit() {
    await this.getAllPosts();

    this.showDots();

    setTimeout(() => {
      const cPosts = document.querySelectorAll('.column-post');

      for (let i = 0; i < cPosts.length; i++) {
        const dots = document.querySelector(`.cdots${i}`) as HTMLElement;

        const options = document.querySelector(`.coptions${i}`) as HTMLElement;

        const deleteOptions = document.querySelector(
          `.delete${i}`
        ) as HTMLElement;

        const deleteConfirmation = document.querySelector(
          `.deleteOP${i}`
        ) as HTMLElement;

        const No = document.querySelector(`.cNo${i}`) as HTMLElement;

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

  async getAllPosts() {
    this.postsService.findAll().subscribe((data: Post[]) => {
      this.columnPosts = data.slice(0, 2);
    });
  }
  async moveToUpdatePage(id: string) {
    this.route.navigate([`posts/update/${id}`], {
      queryParams: { id: id },
    });
  }
  async moveToSinglePostPage(id: string) {
    this.route.navigate([`posts/single-post/${id}`], {
      queryParams: { id: id },
    });
  }
  async moveToCategoryPostPage(category: string) {
    this.route.navigate([`category-post/${category}`], {
      queryParams: { category: category },
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
