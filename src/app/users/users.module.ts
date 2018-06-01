import { NgModule } from '@angular/core';
import { UsersRouteModule } from './users.route';
import { SharedModule } from '../shared/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HammerDemoComponent } from './hammer-demo/hammer-demo.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { MessagesComponent } from './messages/messages.component';
import { UsersRootComponent } from './users-root/users-root.component';

@NgModule({
  imports: [
    SharedModule,
    UsersRouteModule,
  ],
  declarations: [
    DashboardComponent,
    HammerDemoComponent,
    UsersComponent,
    UserDetailComponent,
    UserSearchComponent,
    MessagesComponent,
    UsersRootComponent,
  ],
})
export class UsersModule { }
