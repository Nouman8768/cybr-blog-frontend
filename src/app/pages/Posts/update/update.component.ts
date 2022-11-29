import { map, Observable, switchMap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../../../shared/dto/post.schema';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostService } from 'src/app/shared/service/post.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  constructor(
    private readonly service: PostService,
    private readonly route: Router,
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

    this.post = await this.service.findOne(id!);

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
    await this.route.navigate(['/']);
  }

  async updatePost(): Promise<Post> {
    console.log('Response Before', this.postForm.value);
    const response = await this.service.update(
      this.postForm.value._id,
      this.postForm.value
    );
    return response;
  }

  async submitImage() {
    if (this.selectedImage != undefined) {
      const formData = new FormData();
      formData.append('file', this.file);

      const unlinked = await this.service.unlinkImagefromServer(
        this.postForm.value.image
      );
      const uploadImage = await this.service.uploadImage(formData);
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
