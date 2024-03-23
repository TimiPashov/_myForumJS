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

  getTheme(themeId: string | null) {
    return this.http.get<Theme>(`${this.apiUrl}/themes/${themeId}`)
  }

  getPosts(limit?: number) {
    let url = `${this.apiUrl}/posts`;
    if (limit) {
      url += `?limit=${limit}`
    }
    return this.http.get<Post[]>(`${url}`)
  }
}
