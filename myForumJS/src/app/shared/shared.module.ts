import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { RouterModule } from '@angular/router';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { DateTransformPipe } from './pipes/date-transform.pipe';



@NgModule({
  declarations: [
    LoaderComponent,
    ErrorPageComponent,
    WelcomePageComponent,
    TimeAgoPipe,
    DateTransformPipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[LoaderComponent, TimeAgoPipe, DateTransformPipe]
})
export class SharedModule { }
