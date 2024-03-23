import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthUser } from '../types/user';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {
    this.user$.subscribe((user) => {
      this.user = user;
    })
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthUser>('/api/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)))
  }

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string,
    tel: string,
  ) {
    return this.http.post<AuthUser>('/api/register', {
      username,
      email,
      password,
      rePassword,
      tel,
    })
      .pipe(tap((user) => {
        this.user$$.next(user)
        this.router.navigate(['/themes'])
      }))
  }

  logout() {
    return this.http
      .post('/api/logout', {})
      .pipe(tap((user) => this.user$$.next(undefined)));
  }
}
