import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdersToCompleteComponent } from './orders-to-complete/orders-to-complete.component';
import { CompletationRootComponent } from './completation-root/completation-root.component';
import { CompletationOrderDetailComponent } from './completation-order-detail/completation-order-detail.component';


const routes: Routes = [
  { path: '',
    component: CompletationRootComponent,
    children: [
      {
        path: 'all',
        component: OrdersToCompleteComponent, // todo: separate component for already completed orders here
      },
      {
        path: 'detail/:id',
        component: CompletationOrderDetailComponent,
      },
      {
        path: '',
        component: OrdersToCompleteComponent,
      },
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
export class CompletationRouteModule { }
