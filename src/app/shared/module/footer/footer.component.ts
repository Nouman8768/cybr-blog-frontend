import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/dto/post.schema';
import { AuthService } from '../../service/auth.service';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(
    private readonly postsService: PostService,
    private readonly authService: AuthService,
    private readonly route: Router
  ) {}

  showdots: boolean = false;

  confirmationState: boolean = true;
  fpPosts!: Post[];

  async ngOnInit() {
    await this.getAllPosts();

    this.showDots();

    setTimeout(() => {
      const cPosts = document.querySelectorAll('.fp-post');
      const fllPosts = document.querySelectorAll('.fll-post');

      for (let i = 0; i <= cPosts.length; i++) {
        const dots = document.querySelector(`.fp-dots${i}`) as HTMLElement;

        const options = document.querySelector(
          `.fp-options${i}`
        ) as HTMLElement;

        const deleteOptions = document.querySelector(
          `.fp-delete${i}`
        ) as HTMLElement;

        const deleteConfirmation = document.querySelector(
          `.fp-confirmation${i}`
        ) as HTMLElement;

        const No = document.querySelector(`.fp-No${i}`) as HTMLElement;

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
      this.fpPosts = data.slice(0, 4);
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
