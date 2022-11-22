import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostSchema } from 'src/app/pages/Posts/post.schema';
import { PostService } from 'src/app/pages/Posts/post.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(
    private postService: PostService,
    private readonly route: Router
  ) {}

  confirmationState: boolean = true;
  fpPosts!: PostSchema[];
  flPosts!: PostSchema[];

  async ngOnInit() {
    await this.getAllPosts();
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

        deleteOptions.addEventListener('click', () => {
          deleteConfirmation.style.display = 'flex';
        });

        No.addEventListener('click', () => {
          deleteConfirmation.style.display = 'none';
        });
      }

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
    this.postService.getPosts().subscribe((data: PostSchema[]) => {
      this.fpPosts = data.slice(0, 4);
      this.flPosts = data.slice(2, 6);
    });
  }
  async sendDetailstoUpdatePage(details: PostSchema) {
    this.postService.setter(details);
    this.route.navigate(['update-post']);
  }

  async deletePost(id: string, filename: string) {
    const deleted = await this.postService.deletePost(id);
    const unlinked = await this.postService.unlinkServerImage(filename);
    this.getAllPosts();
    console.log(deleted);
  }
}
