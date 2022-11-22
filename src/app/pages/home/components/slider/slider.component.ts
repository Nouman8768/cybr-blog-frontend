import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostSchema } from 'src/app/pages/Posts/post.schema';
import { PostService } from 'src/app/pages/Posts/post.service';
import SwiperCore, { Pagination, Navigation, SwiperOptions } from 'swiper';

SwiperCore.use([Pagination, Navigation]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent implements OnInit {
  pagination = {
    clickable: true,
  };
  constructor(
    private postService: PostService,
    private readonly route: Router
  ) {}

  options: boolean = false;
  confirmationState: boolean = true;
  sliderPosts!: PostSchema[];

  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    grabCursor: true,
    loopFillGroupWithBlank: true,
    pagination: {
      clickable: true,
    },
    navigation: true,
    breakpoints: {
      1536: {
        slidesPerView: 3,
        spaceBetween: -80,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: -25,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: -80,
      },
    },
  };

  async ngOnInit() {
    await this.getAllPosts();
    setTimeout(() => {
      const cPosts = document.querySelectorAll('.slider-post');

      for (let i = 0; i < cPosts.length; i++) {
        const dots = document.querySelector(`.sdots${i}`) as HTMLElement;

        const options = document.querySelector(`.soptions${i}`) as HTMLElement;

        const deleteOptions = document.querySelector(
          `.sdelete${i}`
        ) as HTMLElement;

        const deleteConfirmation = document.querySelector(
          `.sdeleteOP${i}`
        ) as HTMLElement;

        const No = document.querySelector(`.sNo${i}`) as HTMLElement;

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
      this.sliderPosts = data;
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
