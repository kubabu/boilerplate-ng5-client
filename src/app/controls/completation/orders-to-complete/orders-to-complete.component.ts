import { Component, OnInit } from '@angular/core';

import { CompletationOrdersService } from 'app/services/completation/completation-orders.service';


@Component({
  selector: 'app-orders-to-complete',
  templateUrl: './orders-to-complete.component.html',
  styleUrls: ['./orders-to-complete.component.scss'],
})
export class OrdersToCompleteComponent implements OnInit {

  constructor(
    public ordersService: CompletationOrdersService,
  ) { }

  ngOnInit() {
  }
}
