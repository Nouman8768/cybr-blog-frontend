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

  public async updateProfile(id: string, body: UserDto): Promise<UserDto> {
    let res = this.http.patch<UserDto>(`${this.url}/users/${id}`, body);
    let data = await lastValueFrom(res);
    return data;
  }

  public async count(): Promise<number> {
    let res = this.http.get<number>(`${this.url}/users/count`);
    let data = await lastValueFrom(res);
    return data;
  }

  public async makeAdmin(id: string): Promise<UserDto> {
    let res = this.http.patch<UserDto>(`${this.url}/users/makeAdmin/${id}`, {});
    let data = await lastValueFrom(res);
    return data;
  }

  public async dismissAsAdmin(id: string): Promise<UserDto> {
    let res = this.http.patch<UserDto>(
      `${this.url}/users/dismissAsAdmin/${id}`,
      {}
    );

    let data = await lastValueFrom(res);
    return data;
  }

  public async blockUser(id: string): Promise<UserDto> {
    let res = this.http.patch<UserDto>(`${this.url}/users/banUser/${id}`, {});
    let data = await lastValueFrom(res);
    return data;
  }

  public async uploadImage(imageBody: FormData): Promise<FormData> {
    let res = this.http.post<any>(`${this.url}/profile`, imageBody);
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
