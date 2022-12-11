import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDto } from '../dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}
  url: string = environment.serverUrl;

  token: string | null = localStorage.getItem('accesstoken');

  public async getUser(id: string): Promise<UserDto> {
    let type = 'Bearer';
    const header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + this.token!
    );
    let res = this.http.get<UserDto>(`${this.url}/users/byId/${id}`);
    let data = await lastValueFrom(res);
    return data;
  }
}
