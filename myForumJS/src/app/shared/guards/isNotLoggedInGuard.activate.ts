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

  checkUserAccess() {
    return this.userService.user$.pipe(
      take(1),
      map((data) => {
        if (data) {
          return false;
        }
        return true;
      }),
    );
  }

  // if (
  //   (route.url[0].path === 'login' || route.url[0].path === 'register') &&
  //   this.userService.isLoggedIn === false
  // ) {

  //   return true;
  // } else if (
  //   (route.url[0].path === 'login' || route.url[0].path === 'register') &&
  //   this.userService.isLoggedIn === true
  // ) {
  //   this.router.navigate(['/404']);
  // }

  // if (!this.userService.isLoggedIn) {
  //   this.router.navigate(['/auth/login']);
  // }

  // return this.userService.isLoggedIn;
}
