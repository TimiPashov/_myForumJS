import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http'
import { ThemesModule } from './themes/themes.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    ThemesModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
