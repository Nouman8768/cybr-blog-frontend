import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from '../dto/post.schema';
import { UserDto } from '../dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}
  url: string = environment.serverUrl;

  token: string | null = localStorage.getItem('accesstoken');

  public async getUser(id: string): Promise<UserDto> {
    let res = this.http.get<UserDto>(`${this.url}/users/byId/${id}`);
    let data = await lastValueFrom(res);
    return data;
  }

  public findAll(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(`${this.url}/users`);
  }

  public getUserPosts(id: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.url}/blog-posts/userPosts/${id}`);
  }

  public async count(): Promise<number> {
    let res = this.http.get<number>(`${this.url}/users/count`);
    let data = await lastValueFrom(res);
    return data;
  }
}
