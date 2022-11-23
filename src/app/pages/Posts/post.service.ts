import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { PostSchema } from './post.schema';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private readonly http: HttpClient) {}
  post!: PostSchema;
  category?: string;
  url: string = 'http://localhost:3000';

  public setter(post: PostSchema) {
    this.post = post;
  }
  public getter() {
    return this.post;
  }

  public async addPost(post: PostSchema): Promise<PostSchema> {
    let res = this.http.post<PostSchema>(`${this.url}/blog-posts`, post);
    let data = await lastValueFrom(res);
    return data;
  }

  public getPosts(): Observable<PostSchema[]> {
    return this.http.get<PostSchema[]>(`${this.url}/blog-posts`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  public populateSinglePost(id: string): Observable<PostSchema> {
    return this.http.get<PostSchema>(`${this.url}/blog-posts/${id}`);
  }
  public getCategoryPosts(category: string): Observable<PostSchema[]> {
    return this.http.get<PostSchema[]>(
      `${this.url}/blog-posts/categoryPosts/${category}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  public async deletePost(id: string): Promise<PostSchema> {
    let res = this.http.delete<PostSchema>(`${this.url}/blog-posts/${id}`);
    let data = await lastValueFrom(res);
    return data;
  }
  public async unlinkServerImage(filename: string): Promise<string> {
    let res = this.http.delete<string>(
      `${this.url}/blog-posts/server/${filename}`
    );
    let data = await lastValueFrom(res);
    return data;
  }

  public async updatePost(id: string, post: PostSchema): Promise<PostSchema> {
    let res = this.http.patch<PostSchema>(
      `${this.url}/blog-posts/${id}`,
      post,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    let data = await lastValueFrom(res);
    return data;
  }

  public async uploadImage(imageBody: FormData): Promise<FormData> {
    let res = this.http.post<any>(`${this.url}/images`, imageBody);
    let data = await lastValueFrom(res);
    return data['url'];
  }
}
