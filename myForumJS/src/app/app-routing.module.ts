import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/themes' },
  {
    path: 'auth',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
  },
  { path: '**', redirectTo: '/404' },
  { path: '404', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
