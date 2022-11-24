import { map, Observable, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../post.schema';
import { PostService } from '../post.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  constructor(
    private postService: PostService,
    private readonly activeroute: ActivatedRoute
  ) {}

  postForm!: FormGroup;
  file!: File;
  selectedImage!: string;
  post!: Post;

  ngOnInit(): void {
    this.getAll();
  }
  async getAll() {
    let id = this.activeroute.snapshot.paramMap.get('id');
    console.log(id);

    this.post = await this.postService.populateSinglePost(id!);

    this.postForm = new FormGroup({
      _id: new FormControl(this.post._id),
      title: new FormControl(this.post.title, [Validators.required]),
      body: new FormControl(this.post.body, [Validators.required]),
      category: new FormControl(this.post.category, [Validators.required]),
      image: new FormControl(this.post.image, [Validators.required]),
    });
  }
  async submitUpdateForm() {
    await this.submitImage();
    await this.updatePost();
  }

  async updatePost(): Promise<Post> {
    console.log('Response Before', this.postForm.value);
    const response = await this.postService.updatePost(
      this.postForm.value._id,
      this.postForm.value
    );
    return response;
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
    const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
    if (this.file && allowedMimeTypes.includes(this.file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }
}
