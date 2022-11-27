import { map, Observable, switchMap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from 'src/app/shared/post.schema';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-header-post',
  templateUrl: './header-post.component.html',
  styleUrls: ['./header-post.component.scss'],
})
export class HeaderPostComponent implements OnInit {
  constructor(
    private readonly service: PostService,
    private readonly route: Router
  ) {}

  options: boolean = false;
  confirmationState: boolean = true;
  columnPosts: Post[] = [];

  async ngOnInit() {
    await this.getAllPosts();
    setTimeout(() => {
      const cPosts = document.querySelectorAll('.header-post');

      for (let i = 0; i < cPosts.length; i++) {
        const dots = document.querySelector(`.hdots${i}`) as HTMLElement;

        const options = document.querySelector(`.hoptions${i}`) as HTMLElement;

        const deleteOptions = document.querySelector(
          `.hdelete${i}`
        ) as HTMLElement;

        const deleteConfirmation = document.querySelector(
          `.hdeleteOP${i}`
        ) as HTMLElement;

        const No = document.querySelector(`.hNo${i}`) as HTMLElement;

        dots?.addEventListener('click', () => {
          options!.classList.toggle('hidden');
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

  getAllPosts() {
    this.service.findAll().subscribe((data: Post[]) => {
      this.columnPosts = data.slice(0, 3);
      console.log(data);
    });
  }
  async moveToUpdatePage(id: string) {
    this.route.navigate([`posts/update/${id}`], {
      queryParams: { id: id },
    });
  }
  async moveToSinglePostPage(id: string) {
    this.route.navigate([`single-post/${id}`], {
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
