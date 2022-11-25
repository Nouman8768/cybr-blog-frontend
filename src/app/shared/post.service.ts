import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  public search(text: string): Observable<Post[] | Post> {
    return this.http.get<Post[] | Post>(`${this.url}/blog-posts?text=${text}`);
  }

  public async delete(id: string): Promise<Post> {
    let res = this.http.delete<Post>(`${this.url}/blog-posts/${id}`);
    let data = await lastValueFrom(res);
    return data;
  }

  public async unlinkImagefromServer(filename: string): Promise<string> {
    let res = this.http.delete<string>(
      `${this.url}/blog-posts/server/${filename}`
    );
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
    let res = this.http.post<any>(`${this.url}/images`, imageBody);
    let data = await lastValueFrom(res);
    return data['url'];
  }
}
