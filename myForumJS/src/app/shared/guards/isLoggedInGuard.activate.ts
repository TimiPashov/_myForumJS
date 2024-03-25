import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/user/user.service";


@Injectable({ providedIn: 'root' })
export class IsLoggedInGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        if( !this.userService.isLoggedIn){
            this.router.navigate(['/auth/login']);
        }

        return this.userService.isLoggedIn;
    }
}