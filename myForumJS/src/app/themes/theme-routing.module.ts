import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CurrentThemeComponent } from "./current-theme/current-theme.component";
import { HomeComponent } from "../core/home/home.component";
import { AddThemeComponent } from "./add-theme/add-theme.component";
import { IsLoggedInGuard } from "../shared/guards/isLoggedInGuard.activate";



const routes: Routes = [
    {
        path: 'themes', children: [
            { path: '', pathMatch: 'full', component: HomeComponent },
            { path: 'add-theme', component: AddThemeComponent, canActivate: [IsLoggedInGuard] },
            { path: ':themeId', component: CurrentThemeComponent },


        ]

    },
]



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ThemeRoutingModule { }