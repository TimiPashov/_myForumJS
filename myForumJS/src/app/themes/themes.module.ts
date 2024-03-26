import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesComponent } from '../themes/themes/themes.component';
import { PostsComponent } from '../themes/posts/posts.component';
import { SharedModule } from '../shared/shared.module';
import { ThemeRoutingModule } from './theme-routing.module';
import { CurrentThemeComponent } from './current-theme/current-theme.component';
import { RouterModule } from '@angular/router';
import { AddThemeComponent } from './add-theme/add-theme.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ThemesComponent,
    PostsComponent,
    CurrentThemeComponent,
    AddThemeComponent,
],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ThemeRoutingModule,
    RouterModule
  ],
  exports: [ThemesComponent, PostsComponent, CurrentThemeComponent, AddThemeComponent]
})
export class ThemesModule { }
