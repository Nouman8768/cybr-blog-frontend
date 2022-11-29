import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../dto/user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}
  url: string = environment.serverUrl;

  public async signUp(body: User): Promise<User> {
    let res = this.http.post<User>(
      `${this.url}/authentication/register`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    let data = await lastValueFrom(res);
    return data;
  }

  public async uploadProfileImage(image: FormData): Promise<FormData> {
    let res = this.http.post<FormData | any>(`${this.url}/profile`, image);
    let data = await lastValueFrom(res);
    return data['url'];
  }
}
