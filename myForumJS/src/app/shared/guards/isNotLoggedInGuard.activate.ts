import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Injectable({ providedIn: 'root' })
export class IsNotLoggedInGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.checkUserAccess();
  }

  checkUserAccess(): Observable<boolean> {
    return this.userService.user$.pipe(
      take(1),
      map((user) => {
        if (
          localStorage.getItem('authUser') === undefined ||
          sessionStorage.getItem('authUser') === undefined
        ) {
          return true;
        }
        if (user) {
          this.router.navigate(['/themes']);
          return false;
        }
        return true;
      }),
    );
  }
}
