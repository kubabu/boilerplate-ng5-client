import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './users/dashboard/dashboard.component';

const ROOT_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
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

