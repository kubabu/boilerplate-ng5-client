import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HammerDemoComponent } from './hammer-demo/hammer-demo.component';
import { UsersComponent } from './users/users.component';
import { UsersRootComponent } from './users-root/users-root.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { MessagesComponent } from 'app/controls/messages/messages.component';


const routes: Routes = [
  { path: '',
    component: UsersRootComponent,
    children: [
      { path: 'all', component: UsersComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'touch', component: HammerDemoComponent },
      { path: 'detail/:id', component: UserDetailComponent },
      {
        path: '',
        component: DashboardComponent,
      },
      // { path: 'top', redirectTo: 'dashboard',  pathMatch: 'full' },
    ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class UsersRouteModule { }
