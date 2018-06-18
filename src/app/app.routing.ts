import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from 'app/controls/login/login.component';
import { LogoutComponent } from 'app/controls/logout/logout.component';
import { NotFoundComponent } from 'app/controls/not-found/not-found.component';
import { DashboardComponent } from 'app/controls/users/dashboard/dashboard.component';
import { HammerDemoComponent } from 'app/controls/hammer-demo/hammer-demo.component';
import { MessagesComponent } from 'app/controls/messages/messages.component';

const ROOT_ROUTES: Routes = [
  {
    path: 'touch',
    component: HammerDemoComponent,
  },
  {
    path: 'messages',
    component: MessagesComponent,
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
    loadChildren: './controls/users/users.module#UsersModule',
  },
  {
    path: 'barcode',
    loadChildren: './controls/barcode/barcode.module#BarcodeModule',
  },
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
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

