import { NgModule } from '@angular/core';
import { SignaturePadModule } from 'angular2-signaturepad';

import { SharedModule } from 'app/shared/shared.module';
import { CompletationRouteModule } from './completation.route';
import { CompletationRootComponent } from './completation-root/completation-root.component';
import { CompletationOrderDetailComponent } from './completation-order-detail/completation-order-detail.component';
import { OrdersToCompleteComponent } from 'app/controls/completation/orders-to-complete/orders-to-complete.component';


@NgModule({
  imports: [
    SharedModule,
    CompletationRouteModule,
    SignaturePadModule,
  ],
  declarations: [
    OrdersToCompleteComponent,
    CompletationRootComponent,
    CompletationOrderDetailComponent,
  ],
})
export class CompletationModule { }
