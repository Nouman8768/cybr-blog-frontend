import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostSchema } from '../post.schema';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent implements OnInit {
  constructor(private postService: PostService) {}

  postForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  result!: PostSchema;
  file!: File;
  selectedImage!: string;

  ngOnInit(): void {}

  async submitPostForm() {
    await this.submitImage();
    await this.savePost();
  }

  async savePost() {
    this.result = await this.postService.addPost(this.postForm.value);
    console.log(this.result);
  }

  async submitImage() {
    if (this.selectedImage != undefined) {
      const formData = new FormData();
      formData.append('file', this.file);

      const uploadImage = await this.postService.uploadImage(formData);

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
        console.log('Image', this.selectedImage);
      };
      reader.readAsDataURL(this.file);
    }
  }
}
