import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/post.schema';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(
    private readonly service: PostService,
    private readonly route: Router
  ) {}

  confirmationState: boolean = true;
  fpPosts!: Post[];

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
    this.service.getPosts().subscribe((data: Post[]) => {
      this.fpPosts = data.slice(0, 4);
    });
  }
  async sendDetailstoUpdatePage(details: Post) {
    this.route.navigate([`update/${details._id}`]);
  }
  async populateSinglePostData(details: Post) {
    this.route.navigate([`single-post/${details._id}`]);
  }
  async deletePost(id: string, filename: string) {
    const deleted = await this.service.deletePost(id);
    const unlinked = await this.service.unlinkServerImage(filename);
    this.getAllPosts();
  }
}
