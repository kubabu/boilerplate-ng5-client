import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from 'app/app.component';
import { DashboardComponent } from 'app/users/dashboard/dashboard.component';
import { LoginComponent } from 'app/pages/login/login.component';
import { LogoutComponent } from 'app/pages/logout/logout.component';
import { NotFoundComponent } from 'app/pages/not-found/not-found.component';

const ROOT_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
  },
  {
    path: 'barcode',
    loadChildren: './barcode/barcode.module#BarcodeModule',
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(ROOT_ROUTES),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}

