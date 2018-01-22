// import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HammerDemoComponent } from './hammer-demo/hammer-demo.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroesRootComponent } from 'app/heroes/heroes-root/heroes-root.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';


const routes: Routes = [
  { path: '',
    component: HeroesRootComponent,
    children: [
      { path: 'all', component: HeroesComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'touch', component: HammerDemoComponent },
      { path: 'detail/:id', component: HeroDetailComponent },
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
export class HeroesRouteModule { }
