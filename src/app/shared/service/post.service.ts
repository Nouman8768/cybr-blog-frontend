import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Post } from '../dto/post.schema';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private readonly http: HttpClient) {}
  post!: Post;

  url: string = environment.serverUrl;

  public async create(post: Post): Promise<Post> {
    let res = this.http.post<Post>(`${this.url}/blog-posts`, post);
    let data = await lastValueFrom(res);
    return data;
  }

  public findAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/blog-posts`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async findOne(id: string): Promise<Post> {
    let res = this.http.get<Post>(`${this.url}/blog-posts?id=${id}`);
    let data = await lastValueFrom(res);
    return data;
  }

  public findByCategory(category: string): Observable<Post[]> {
    console.log(category);

    return this.http.get<Post[]>(
      `${this.url}/blog-posts?category=${category}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  public getByAuthorPosts(author: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/blog-posts?author=${author}`);
  }

  public async count(): Promise<number> {
    let res = this.http.get<number>(`${this.url}/blog-posts/count`);
    let data = await lastValueFrom(res);
    return data;
  }

  public search(text: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/blog-posts?text=${text}`);
  }

  public async delete(id: string): Promise<Post> {
    let res = this.http.delete<Post>(`${this.url}/blog-posts/${id}`);
    let data = await lastValueFrom(res);
    return data;
  }

  public async update(id: string, post: Post): Promise<Post> {
    let res = this.http.patch<Post>(`${this.url}/blog-posts/${id}`, post, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let data = await lastValueFrom(res);
    return data;
  }

  public async uploadImage(imageBody: FormData): Promise<FormData> {
    let res = this.http.post<any>(`${this.url}/blogpost`, imageBody);
    let data = await lastValueFrom(res);
    return data['url'];
  }

  public async unlinkImagefromServer(filename: string): Promise<string> {
    let res = this.http.delete<string>(
      `${this.url}/blog-posts/server/${filename}`
    );
    let data = await lastValueFrom(res);
    return data;
  }
}
