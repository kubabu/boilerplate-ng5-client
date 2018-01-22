import { NgModule } from '@angular/core';
import { HeroesRouteModule } from './heroes.route';
import { SharedModule } from '../modules/shared.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HammerDemoComponent } from './hammer-demo/hammer-demo.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { MessagesComponent } from './messages/messages.component';
import { HeroesRootComponent } from './heroes-root/heroes-root.component';

@NgModule({
  imports: [
    SharedModule,
    HeroesRouteModule,
  ],
  declarations: [
    DashboardComponent,
    HammerDemoComponent,
    HeroesComponent,
    HeroDetailComponent,
    HeroSearchComponent,
    MessagesComponent,
    HeroesRootComponent,
  ],
})
export class HeroesModule { }
