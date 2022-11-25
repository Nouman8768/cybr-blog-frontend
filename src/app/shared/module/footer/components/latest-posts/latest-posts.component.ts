import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/post.schema';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.scss'],
})
export class LatestPostsComponent implements OnInit {
  constructor(
    private readonly service: PostService,
    private readonly route: Router
  ) {}

  confirmationState: boolean = true;

  flPosts!: Post[];

  async ngOnInit() {
    await this.getAllPosts();
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
    this.service.findAll().subscribe((data: Post[]) => {
      this.flPosts = data.slice(2, 6);
    });
  }
  async sendDetailstoUpdatePage(details: Post) {
    this.route.navigate([`update/${details._id}`]);
  }
  async populateSinglePostData(details: Post) {
    this.route.navigate([`single-post/${details._id}`]);
  }
  async deletePost(id: string, filename: string) {
    const deleted = await this.service.delete(id);
    const unlinked = await this.service.unlinkImagefromServer(filename);
    this.getAllPosts();
  }
}