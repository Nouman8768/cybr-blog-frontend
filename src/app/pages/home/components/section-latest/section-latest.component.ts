import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/shared/dto/post.schema';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-section-latest',
  templateUrl: './section-latest.component.html',
  styleUrls: ['./section-latest.component.scss'],
})
export class SectionLatestComponent implements OnInit {
  constructor(
    private readonly service: PostService,
    private readonly route: Router
  ) {}

  confirmationState: boolean = true;
  sidePosts: Post[] = [];

  async ngOnInit() {
    await this.getAllPosts();
    setTimeout(() => {
      const cPosts = document.querySelectorAll('.side-post');

      for (let i = 0; i < cPosts.length; i++) {
        const dots = document.querySelector(`.sidots${i}`) as HTMLElement;

        const options = document.querySelector(`.sioptions${i}`) as HTMLElement;

        const deleteOptions = document.querySelector(
          `.sidelete${i}`
        ) as HTMLElement;

        const deleteConfirmation = document.querySelector(
          `.sideleteOP${i}`
        ) as HTMLElement;

        const No = document.querySelector(`.siNo${i}`) as HTMLElement;

        dots?.addEventListener('click', () => {
          options!.classList.toggle('hidden');
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
      this.sidePosts = data.reverse().slice(1, 7);
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

  async deletePost(id: string, filename: string) {
    const deleted = await this.service.delete(id);
    const unlinked = await this.service.unlinkImagefromServer(filename);
    this.getAllPosts();
  }
}
