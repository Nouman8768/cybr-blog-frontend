import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Post } from './post.schema';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private readonly http: HttpClient) {}
  post!: Post;

  url: string = environment.serverUrl;

  public setter(post: Post) {
    this.post = post;
  }

  public getter() {
    return this.post;
  }

  public async addPost(post: Post): Promise<Post> {
    let res = this.http.post<Post>(`${this.url}/blog-posts`, post);
    let data = await lastValueFrom(res);
    return data;
  }

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/blog-posts`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async populateSinglePost(id: string): Promise<Post> {
    let res = this.http.get<Post>(`${this.url}/blog-posts/${id}`);
    let data = await lastValueFrom(res);
    return data;
  }

  public getCategoryPosts(category: string): Observable<Post[]> {
    return this.http.get<Post[]>(
      `${this.url}/blog-posts/categoryPosts/${category}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  public async deletePost(id: string): Promise<Post> {
    let res = this.http.delete<Post>(`${this.url}/blog-posts/${id}`);
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

  public async updatePost(id: string, post: Post): Promise<Post> {
    let res = this.http.patch<Post>(`${this.url}/blog-posts/${id}`, post, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let data = await lastValueFrom(res);
    return data;
  }

  public async uploadImage(imageBody: FormData): Promise<FormData> {
    let res = this.http.post<any>(`${this.url}/images`, imageBody);
    let data = await lastValueFrom(res);
    return data['url'];
  }
}
