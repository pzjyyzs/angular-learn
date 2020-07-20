import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ServiceModule } from './service.module';

export interface Profile {
  username: string;
  name: string;
  gender: number;
  avatar: string;
  address: string;
  birthday: string;
}

@Injectable({
  providedIn: ServiceModule
})
export class MyService {

  constructor(private http: HttpClient) { }

  getProfile() {
    return this.http.get<Profile>(`${environment.baseUrl}/profile`);
}
}
