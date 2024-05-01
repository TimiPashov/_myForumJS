import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { AuthUser, ProfileDetailsUser } from '../types/user';
import { BehaviorSubject, Subscription, tap, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<AuthUser | undefined>(undefined);
  user$ = this.user$$.asObservable();

  user: AuthUser | undefined;
  userSub: Subscription;

  get isLoggedIn() {
    return this.user$;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.userSub = this.user$.subscribe((user) => {
      this.setUserLocalStorage(user);
      this.user = user;
    });
  }

  setUserLocalStorage(user: AuthUser | undefined) {
    localStorage.setItem('authUser', JSON.stringify(user));
    sessionStorage.setItem('authUser', JSON.stringify(user));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthUser>('/api/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string,
    tel: string,
  ) {
    return this.http
      .post<AuthUser>('/api/register', {
        username,
        email,
        password,
        rePassword,
        tel,
      })
      .pipe(
        tap((user) => {
          this.user$$.next(user);
          this.router.navigate(['/themes']);
        }),
      );
  }

  logout() {
    return this.http.post('/api/logout', {}).pipe(
      tap(() => {
        localStorage.clear();
        sessionStorage.clear();
        this.user$$.next(undefined);
      }),
    );
  }
  getUser(userId: string) {
    return this.http.get<ProfileDetailsUser>(`/api/users/${userId}`).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        return throwError(
          () => new Error('Something bad happened; please try again later.'),
        );
      }),
    );
  }

  

  getProfile() {
    return this.http
      .get<AuthUser>('/api/users/profile')
      .pipe(
        tap((user) => this.user$$.next(user)),
        catchError(error => {
          console.error('An error occurred:', error);
          return throwError(() => new Error('Something bad happened; please try again later.'));
        })
      );
      
  }

  updateProfile(username: string, email: string, tel?: string) {
    return this.http
      .put<AuthUser>('/api/users/profile', { username, email, tel })
      .pipe(tap((user) => this.user$$.next(user)),
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(() => new Error('Something bad happened; please try again later.'));
      })
      );
    
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
