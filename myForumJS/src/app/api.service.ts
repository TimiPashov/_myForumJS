import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Theme } from './types/theme';
import { Post } from './types/post';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }




  getThemes() {

    return this.http.get<Theme[]>(`/api/themes`);
  }

  getTheme(themeId: string | null) {
    return this.http.get<Theme>(`/api/themes/${themeId}`)
  }

  createTheme(themeName: string, postText: string) {
    return this.http.post<Theme>(`/api/themes`, { themeName, postText })
  }

  getPosts(limit?: number) {
    let url = `/api/posts`;
    if (limit) {
      url += `?limit=${limit}`
    }
    return this.http.get<Post[]>(`${url}`)
  }
}
