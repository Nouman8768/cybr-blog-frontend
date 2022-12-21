import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/dto/post.schema';
import { AuthService } from 'src/app/shared/service/auth.service';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.scss'],
})
export class LatestPostsComponent implements OnInit {
  constructor(
    private readonly postsService: PostService,
    private readonly authService: AuthService,
    private readonly route: Router
  ) {}

  showdots: boolean = false;

  confirmationState: boolean = true;

  flPosts!: Post[];

  async ngOnInit() {
    await this.getAllPosts();

    this.showDots();

    setTimeout(() => {
      const fllPosts = document.querySelectorAll('.fll-post');

      for (let i = 0; i <= fllPosts.length; i++) {
        const dots = document.querySelector(`.fl-dots${i}`) as HTMLElement;

        const options = document.querySelector(
          `.fl-options${i}`
        ) as HTMLElement;

        const deleteOptions = document.querySelector(
          `.fl-delete${i}`
        ) as HTMLElement;

        const deleteConfirmation = document.querySelector(
          `.fl-confirmation${i}`
        ) as HTMLElement;

        const No = document.querySelector(`.fl-No${i}`) as HTMLElement;

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
    this.postsService.findAll().subscribe((data: Post[]) => {
      this.flPosts = data.slice(2, 6);
    });
  }
  async sendDetailstoUpdatePage(details: Post) {
    this.route.navigate([`posts/update/${details._id}`]);
  }
  async populateSinglePostData(details: Post) {
    this.route.navigate([`posts/single-post/${details._id}`]);
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
