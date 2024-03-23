import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http'
import { ThemesModule } from './themes/themes.module';
import { ThemeRoutingModule } from './themes/theme-routing.module';
import { appInterceptorProvider } from './app.interceptor';
import { AuthenticatorComponent } from './authenticator/authenticator.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticatorComponent,

  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    ThemesModule,
    SharedModule,
    AppRoutingModule,
    ThemeRoutingModule
  ],
  providers: [appInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
