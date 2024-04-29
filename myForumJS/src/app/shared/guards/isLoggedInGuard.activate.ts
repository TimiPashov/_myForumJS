import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { UserService } from 'src/app/user/user.service';

@Injectable({ providedIn: 'root' })
export class IsLoggedInGuard implements CanActivate {
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
      map((data) => {
        if (data) {
          return true;
        }
        this.router.navigate(['/auth/login']);
        return false;
      }),
    );
  }
}
