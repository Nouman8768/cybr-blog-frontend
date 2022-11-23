import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostSchema } from 'src/app/pages/Posts/post.schema';
import { PostService } from 'src/app/pages/Posts/post.service';

@Component({
  selector: 'app-anonymous-post',
  templateUrl: './anonymous-post.component.html',
  styleUrls: ['./anonymous-post.component.scss'],
})
export class AnonymousPostComponent implements OnInit {
  constructor(
    private postService: PostService,
    private readonly route: Router
  ) {}

  confirmationState: boolean = true;
  anonymousPosts!: PostSchema[];

  async ngOnInit() {
    await this.getAllPosts();
    setTimeout(() => {
      const dots = document.querySelector('.a-dots') as HTMLElement;

      const options = document.querySelector('.a-options') as HTMLElement;

      const deleteOptions = document.querySelector('.a-delete') as HTMLElement;

      const deleteConfirmation = document.querySelector(
        '.a-confirmation'
      ) as HTMLElement;

      const No = document.querySelector('.a-No') as HTMLElement;

      dots?.addEventListener('click', () => {
        options!.classList.toggle('hidden');
      });

      deleteOptions.addEventListener('click', () => {
        deleteConfirmation.style.display = 'flex';
      });

      No.addEventListener('click', () => {
        deleteConfirmation.style.display = 'none';
      });
    }, 800);
  }

  async getAllPosts() {
    this.postService.getPosts().subscribe((data: PostSchema[]) => {
      this.anonymousPosts = data.slice(2, 3);
    });
  }
  async sendDetailstoUpdatePage(details: PostSchema) {
    this.postService.setter(details);
    this.route.navigate(['update-post']);
  }
  async populateSinglePostData(details: PostSchema) {
    this.postService.setter(details);
    this.route.navigate([`single-post/${details._id}`]);
  }

  async deletePost(id: string, filename: string) {
    const deleted = await this.postService.deletePost(id);
    const unlinked = await this.postService.unlinkServerImage(filename);
    this.getAllPosts();
    console.log(deleted);
  }
}
