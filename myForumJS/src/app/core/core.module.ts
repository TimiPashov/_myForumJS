import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ThemesModule } from '../themes/themes.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ThemesModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    HomeComponent
  ]
})
export class CoreModule { }
