import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ProfileComponent } from "./profile/profile.component";
import { IsLoggedInGuard } from "../shared/guards/isLoggedInGuard.activate";


const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [IsLoggedInGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [IsLoggedInGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [IsLoggedInGuard] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {

}