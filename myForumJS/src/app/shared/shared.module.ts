import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesComponent } from './themes/themes.component';
import { PostsComponent } from './posts/posts.component';



@NgModule({
  declarations: [
    ThemesComponent,
    PostsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ThemesComponent,
    PostsComponent
  ]
})
export class SharedModule { }
