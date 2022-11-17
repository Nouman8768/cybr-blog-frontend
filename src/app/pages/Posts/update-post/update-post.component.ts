import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostSchema } from '../post.schema';
import { PostService } from '../post.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss'],
})
export class UpdatePostComponent implements OnInit {
  constructor(private postService: PostService) {}

  postForm!: FormGroup;
  file!: File;
  selectedImage!: string;
  result!: PostSchema;

  ngOnInit(): void {
    console.log(this.postService.getter());
    const data = this.postService.getter();
    this.postForm = new FormGroup({
      _id: new FormControl(data?._id),
      title: new FormControl(data?.title, [Validators.required]),
      category: new FormControl(data?.category, [Validators.required]),
      body: new FormControl(data?.body, [Validators.required]),
      image: new FormControl(data?.image, [Validators.required]),
    });
    console.log(this.postForm.value);
  }
  async submitUpdateForm() {
    await this.submitImage();
    await this.updatePost();
  }

  async updatePost() {
    console.log('Response Before', this.postForm.value);
    const response = await this.postService.updatePost(
      this.postForm.value._id,
      this.postForm.value
    );
  }

  async submitImage() {
    if (this.selectedImage != undefined) {
      const formData = new FormData();
      formData.append('file', this.file);

      const unlinked = await this.postService.unlinkServerImage(
        this.postForm.value.image
      );
      const uploadImage = await this.postService.uploadImage(formData);
      this.postForm.value.image = uploadImage;
    }
  }

  async attachFile(event: any) {
    this.file = (event.target as HTMLInputElement).files![0];
    // this.postForm.patchValue({ image: this.file });
    const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    // this.postForm.get('image')?.updateValueAndValidity();
    if (this.file && allowedMimeTypes.includes(this.file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
        // console.log('Image', this.selectedImage);
      };
      reader.readAsDataURL(this.file);
    }
  }
}
