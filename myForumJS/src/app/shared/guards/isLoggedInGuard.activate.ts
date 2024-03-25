import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/user/user.service";


@Injectable({ providedIn: 'root' })
export class IsLoggedInGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log(route.url[0]);
        console.log(this.userService.isLoggedIn);

        if ((route.url[0].path === 'login' || route.url[0].path === 'register') && this.userService.isLoggedIn === false) {

            return true;

        } else if ((route.url[0].path === 'login' || route.url[0].path === 'register') && this.userService.isLoggedIn === true) {

            this.router.navigate(['/404']);
        }

        if (!this.userService.isLoggedIn) {
            this.router.navigate(['/auth/login']);
        }

        return this.userService.isLoggedIn;
    }
}