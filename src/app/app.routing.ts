import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from 'app/controls/login/login.component';
import { LogoutComponent } from 'app/controls/logout/logout.component';
import { NotFoundComponent } from 'app/controls/not-found/not-found.component';
import { DashboardComponent } from 'app/controls/users/dashboard/dashboard.component';
import { HammerDemoComponent } from 'app/controls/hammer-demo/hammer-demo.component';
import { MessagesComponent } from 'app/controls/messages/messages.component';
import { OrdersToCompleteComponent } from 'app/controls/completation/orders-to-complete/orders-to-complete.component';
import { CanLoadUsersSection } from 'app/controls/users/users.guard';
import { CanLoadCompletationSection } from './controls/completation/completation.guard';

const ROOT_ROUTES: Routes = [
  // DEVELOPER DEMO COMPONENTS FROM NOW
  {
    path: 'touch',
    component: HammerDemoComponent,
  },
  {
    path: 'messages',
    component: MessagesComponent,
  },
  {
    path: 'barcode',
    loadChildren: './controls/barcode/barcode.module#BarcodeModule',
  },
  // DEVELOPER DEMO END
  {
    path: 'completation',
    canLoad: [CanLoadCompletationSection],
    // lazy loading of submodule
    loadChildren: './controls/completation/completation.module#CompletationModule',
  },
  {
    path: 'users',
    canLoad: [CanLoadUsersSection],
    loadChildren: './controls/users/users.module#UsersModule',
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

