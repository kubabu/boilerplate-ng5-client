import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from 'app/app.component';
import { NotFoundComponent } from 'app/not-found/not-found.component';
import { DashboardComponent } from 'app/users/dashboard/dashboard.component';
import { LoginComponent } from 'app/pages/login/login.component';

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

