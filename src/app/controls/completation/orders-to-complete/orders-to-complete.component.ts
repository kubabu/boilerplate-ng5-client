import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CompletationOrdersService } from 'app/services/completation/completation-orders.service';
import { CompletationOrder } from 'app/models/completation-order';


@Component({
  selector: 'app-orders-to-complete',
  templateUrl: './orders-to-complete.component.html',
  styleUrls: ['./orders-to-complete.component.scss'],
})
export class OrdersToCompleteComponent implements OnInit {
  Orders$: Observable<CompletationOrder[]>;

  constructor(
    private ordersService: CompletationOrdersService,
  ) {
    this.Orders$ = this.ordersService.Orders$;
  }

  ngOnInit() {
  }

}
