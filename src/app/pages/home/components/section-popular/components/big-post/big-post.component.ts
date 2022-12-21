import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/dto/post.schema';
import { AuthService } from 'src/app/shared/service/auth.service';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-big-post',
  templateUrl: './big-post.component.html',
  styleUrls: ['./big-post.component.scss'],
})
export class BigPostComponent implements OnInit {
  constructor(
    private readonly postsService: PostService,
    private readonly authService: AuthService,
    private readonly route: Router
  ) {}
  showdots: boolean = false;
  confirmationState: boolean = true;
  highlightedPosts: Post[] = [];

  async ngOnInit() {
    await this.getAllPosts();

    this.showDots();

    setTimeout(() => {
      const b_posts = document.querySelectorAll('.big-post');

      const dots = document.querySelector('.b-dots') as HTMLElement;

      const options = document.querySelector('.b-options') as HTMLElement;

      const deleteOptions = document.querySelector('.b-delete') as HTMLElement;

      const deleteConfirmation = document.querySelector(
        '.b-confirmation'
      ) as HTMLElement;

      const No = document.querySelector('.b-No') as HTMLElement;

      dots?.addEventListener('click', () => {
        options!.classList.toggle('hidden');
      });

      deleteOptions.addEventListener('click', () => {
        deleteConfirmation.style.display = 'flex';
      });

      No.addEventListener('click', () => {
        deleteConfirmation.style.display = 'none';
      });
    }, 800);
  }

  async getAllPosts() {
    this.postsService.findAll().subscribe((data: Post[]) => {
      this.highlightedPosts = data.slice(3, 4);
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
