import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/dto/post.schema';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-highlighted-post',
  templateUrl: './highlighted-post.component.html',
  styleUrls: ['./highlighted-post.component.scss'],
})
export class HighlightedPostComponent implements OnInit {
  constructor(
    private readonly service: PostService,
    private readonly route: Router
  ) {}

  confirmationState: boolean = true;
  highlightedPosts: Post[] = [];

  async ngOnInit(): Promise<void> {
    await this.getAllPosts();
    setTimeout(() => {
      for (let i = 0; i < 4; i++) {
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
      this.highlightedPosts = data.slice(2, 5);
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
    const deleted = await this.service.delete(id);
    const unlinked = await this.service.unlinkImagefromServer(filename);
    this.getAllPosts();
  }
}
