import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesRouteModule } from './heroes.route';
import { SharedModule } from '../modules/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HammerDemoComponent } from './hammer-demo/hammer-demo.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    HeroesRouteModule,
  ],
  declarations: [
    DashboardComponent,
    HammerDemoComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    MessagesComponent,
  ],
})
export class HeroesModule { }
