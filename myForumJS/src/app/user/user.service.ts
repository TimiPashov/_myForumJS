import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUser } from '../types/user';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user$$ = new BehaviorSubject<AuthUser | undefined>(undefined);
  private user$ = this.user$$.asObservable()

  user: AuthUser | undefined;
  USER_KEY = '[user]';

  get isLoggedIn(): boolean {

    return !!this.user
  }

  constructor(private http: HttpClient) {
    this.user$.subscribe((user) => {
      this.user = user;
    })
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthUser>('/api/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)))
  }

  logout(){
    return this.http
    .post('/api/logout', {})
    .pipe(tap((user) => this.user$$.next(undefined)));
  }
}
