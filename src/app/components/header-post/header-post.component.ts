import { map, Observable, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostSchema } from 'src/app/pages/Posts/post.schema';
import { PostService } from 'src/app/pages/Posts/post.service';

@Component({
  selector: 'app-header-post',
  templateUrl: './header-post.component.html',
  styleUrls: ['./header-post.component.scss'],
})
export class HeaderPostComponent implements OnInit {
  constructor(
    private postService: PostService,
    private readonly route: Router
  ) {}

  options: boolean = false;
  confirmationState: boolean = true;
  columnPosts!: PostSchema[];
  title!: string;

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

  async getAllPosts() {
    this.postService.getPosts().subscribe((data: PostSchema[]) => {
      this.columnPosts = data.slice(8, 11);
    });
  }
  async sendDetailstoUpdatePage(details: PostSchema) {
    this.postService.setter(details);
    this.route.navigate(['update-post']);
  }
  async populateSinglePostData(details: PostSchema) {
    // this.postService.setter(details);
    this.route.navigate([`single-post/${details._id}`]);
  }
  async sendCategory(category: PostSchema) {
    this.postService.setter(category);
    this.route.navigate([`category-post/${category.category}`]);
  }

  async deletePost(id: string, filename: string) {
    const deleted = await this.postService.deletePost(id);
    const unlinked = await this.postService.unlinkServerImage(filename);
    this.getAllPosts();
    console.log(deleted);
  }
}
