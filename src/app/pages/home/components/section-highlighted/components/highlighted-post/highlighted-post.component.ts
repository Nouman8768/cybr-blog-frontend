import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostSchema } from 'src/app/pages/Posts/post.schema';
import { PostService } from 'src/app/pages/Posts/post.service';

@Component({
  selector: 'app-highlighted-post',
  templateUrl: './highlighted-post.component.html',
  styleUrls: ['./highlighted-post.component.scss'],
})
export class HighlightedPostComponent implements OnInit {
  constructor(
    private postService: PostService,
    private readonly route: Router
  ) {}

  confirmationState: boolean = true;
  highlightedPosts: PostSchema[] = [];

  async ngOnInit(): Promise<void> {
    await this.getAllPosts();
    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        const dots = document.querySelector(
          `.highlighted-dots${i}`
        ) as HTMLElement;

        const options = document.querySelector(
          `.highlighted-options${i}`
        ) as HTMLElement;

        const deleteOptions = document.querySelector(
          `.highlighted-delete${i}`
        ) as HTMLElement;

        const deleteConfirmation = document.querySelector(
          `.highlighted-confirmation${i}`
        ) as HTMLElement;

        const No = document.querySelector(`.highlighted-No${i}`) as HTMLElement;

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
      this.highlightedPosts = data.slice(6, 10);
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