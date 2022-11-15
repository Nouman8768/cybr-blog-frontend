import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { PostSchema } from './post.schema';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private readonly http: HttpClient) {}
  host: string = 'http://localhost:3000';

  public async addPost(post: PostSchema): Promise<PostSchema> {
    let res = this.http.post<PostSchema>(`${this.host}/blog-post`, post);
    let data = await lastValueFrom(res);
    return data;
  }

  public getPosts(): Observable<PostSchema[]> {
    return this.http.get<PostSchema[]>(`${this.host}/blog-post`);
  }

  public async uploadImage(imageBody: FormData): Promise<FormData> {
    let res = this.http.post<any>(`${this.host}/image`, imageBody);
    let data = await lastValueFrom(res);
    return data['url'];
  }
}
