import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostSchema } from 'src/app/pages/Posts/post.schema';
import { PostService } from 'src/app/pages/Posts/post.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
})
export class AllPostsComponent implements OnInit {
  constructor(
    private postService: PostService,
    private readonly route: Router
  ) {}

  confirmationState: boolean = true;
  allPosts: PostSchema[] = [];
  page: number = 1;

  async ngOnInit(): Promise<void> {
    await this.getAllPosts();
    setTimeout(() => {
      for (let i = 0; i < this.allPosts.length; i++) {
        const dots = document.querySelector(
          `.all-posts-dots${i}`
        ) as HTMLElement;

        const options = document.querySelector(
          `.all-posts-options${i}`
        ) as HTMLElement;

        const deleteOptions = document.querySelector(
          `.all-posts-delete${i}`
        ) as HTMLElement;

        const deleteConfirmation = document.querySelector(
          `.all-posts-confirmation${i}`
        ) as HTMLElement;

        const No = document.querySelector(`.all-posts-No${i}`) as HTMLElement;

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
    this.postService.getPosts().subscribe((data: PostSchema[]) => {
      this.allPosts = data.slice(0, 5);
    });
  }
  async sendDetailstoUpdatePage(details: PostSchema) {
    this.postService.setter(details);
    this.route.navigate(['update-post']);
  }
  async populateSinglePostData(details: PostSchema) {
    this.postService.setter(details);
    this.route.navigate(['single-post']);
  }
  async sendCategory(category: PostSchema) {
    this.postService.setter(category);
    this.route.navigate(['category-post']);
  }

  async deletePost(id: string, filename: string) {
    const deleted = await this.postService.deletePost(id);
    const unlinked = await this.postService.unlinkServerImage(filename);
    this.getAllPosts();
    console.log(deleted);
  }
}
