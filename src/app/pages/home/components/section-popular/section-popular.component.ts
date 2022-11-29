import { PostService } from 'src/app/shared/service/post.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Post } from 'src/app/shared/dto/post.schema';

@Component({
  selector: 'app-section-popular',
  templateUrl: './section-popular.component.html',
  styleUrls: ['./section-popular.component.scss'],
})
export class SectionPopularComponent implements OnInit {
  constructor(private readonly service: PostService) {}

  result!: Post[] | Post;
  search: FormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {}

  async submit() {
    this.service.search(this.search.value).subscribe((data) => {
      this.result = data;
      console.log(data);
      console.log(this.result);

      this.search.reset();
    });
  }
}
