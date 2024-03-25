import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoaderComponent,
    ErrorPageComponent,
    WelcomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[LoaderComponent]
})
export class SharedModule { }
