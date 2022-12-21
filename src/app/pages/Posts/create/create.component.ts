import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/shared/service/post.service';
import { Post } from '../../../shared/dto/post.schema';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  constructor(
    private readonly postsService: PostService,
    private readonly route: Router
  ) {}

  postForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  result!: Post;
  file!: File;
  selectedImage!: string;

  ngOnInit(): void {}

  async submitPostForm() {
    await this.submitImage();
    await this.savePost();
    await this.route.navigate(['/']);
  }

  async savePost(): Promise<Post> {
    this.result = await this.postsService.create(this.postForm.value);
    console.log(this.result);
    return this.result;
  }

  async submitImage() {
    if (this.selectedImage != undefined) {
      const formData = new FormData();
      formData.append('file', this.file);

      const uploadImage = await this.postsService.uploadImage(formData);

      console.log('uploaded response: ', uploadImage);
    }
  }

  async attachFile(event: any) {
    this.file = (event.target as HTMLInputElement).files![0];
    this.postForm.patchValue({ image: this.file });
    const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    this.postForm.get('image')?.updateValueAndValidity();
    if (this.file && allowedMimeTypes.includes(this.file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }
}
