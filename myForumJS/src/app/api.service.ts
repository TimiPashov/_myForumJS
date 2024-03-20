import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Theme } from './types/theme';
import { Post } from './types/post';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;


  getThemes() {

    return this.http.get<Theme[]>(`${this.apiUrl}/themes`);
  }

  getPosts(limit?: number) {
    return this.http.get<Post[]>(`${this.apiUrl}/posts?limit=${limit}`)
  }
}
