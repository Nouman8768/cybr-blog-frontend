import { HttpClient } from '@angular/common/http';
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

  public async getUser(id: string): Promise<UserDto> {
    let res = this.http.get<UserDto>(`${this.url}/users/byId/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let data = await lastValueFrom(res);
    return data;
  }
}
