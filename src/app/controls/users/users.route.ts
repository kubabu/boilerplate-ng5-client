import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UsersRootComponent } from './users-root/users-root.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


const routes: Routes = [
  { path: '',
    component: UsersRootComponent,
    children: [
      { path: 'all', component: UsersComponent },
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
