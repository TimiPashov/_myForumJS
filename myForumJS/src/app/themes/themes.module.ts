import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesComponent } from '../themes/themes/themes.component';
import { PostsComponent } from '../themes/posts/posts.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ThemesComponent, PostsComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [ThemesComponent, PostsComponent]
})
export class ThemesModule { }
