import { Injectable, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { ApiConfiguration } from 'app/config/api-config';
import { CompletationOrder } from 'app/models/completation-order';
import { CompletationOrdersDbService } from 'app/services/completation/completation-orders-db.service';


@Injectable()
export class CompletationOrdersService implements OnInit {
  private _hubConnection: HubConnection;
  private _connectionEstablished$: Subject<boolean>;
  private _ordersToComplete: CompletationOrder[];
  private _ordersToComplete$: Subject<CompletationOrder[]>;
  public IsConnected$: Observable<boolean>;
  public Orders$: Observable<CompletationOrder[]>;


  constructor(
    private apiConfig: ApiConfiguration,
    private ordersDbRepository: CompletationOrdersDbService,
  ) { }

  ngOnInit(): void {
    const hubUrl = this.apiConfig.ApiUrl + this.apiConfig.CompletationHubPath;

    this._connectionEstablished$ = new BehaviorSubject<boolean>(false);
    this._ordersToComplete$ = new Subject<CompletationOrder[]>();
    this.IsConnected$ = this._connectionEstablished$.asObservable();
    this.Orders$ = this._ordersToComplete$.asObservable();

    this._hubConnection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .build();
    this.registerOnServerEvents(this._hubConnection);
    this.startConnection(this._hubConnection, this.apiConfig.HubReconnectTimeoutMs);
  }

  startConnection(hubConnection: HubConnection, reconnectTimeoutMs: number) {
    hubConnection.start()
      .then(() => {
        this._connectionEstablished$.next(true);
        this.loadAllOrders();
      })
      .catch(err => {
        console.log('Error while connecting to hub :', err);
        setTimeout(this.startConnection(hubConnection, reconnectTimeoutMs), reconnectTimeoutMs);
      });
  }

  registerOnServerEvents(hubConnection: HubConnection) {
    hubConnection.on('Add', (data: CompletationOrder) => {
      this.onAdd(data);
    });

    hubConnection.on('Update', (data: CompletationOrder) => {
      this.onUpdate(data);
    });

    hubConnection.on('Deleted', (data: CompletationOrder) => {
      this.onDelete(data);
    });

    hubConnection.onclose(err => {
      console.log(err);
    })
  }

  loadAllOrders() {
    // load all orders, subscribe get them out as observable
    this.ordersDbRepository.getCompletationOrders()
    .subscribe(
      res => {
        // store them in cache
        this._ordersToComplete = res;
        // expose observable
        this._ordersToComplete$.next(res);
      },
      err => {
        console.log('Failed to load orders to complete: ', err);
    });
  }

  onAdd(order: CompletationOrder) {
    this._ordersToComplete.push(order);
    this._ordersToComplete$.next(this._ordersToComplete);
  }

  onUpdate(order: CompletationOrder): any {
    for (let i = 0; i < this._ordersToComplete.length; i++) {
      if (this._ordersToComplete[i].id && this._ordersToComplete[i].id === order.id) {
          this._ordersToComplete.splice(i, 1);
          this._ordersToComplete.push(order);
          break;
      }
    }
    this._ordersToComplete$.next(this._ordersToComplete);
  }

  onDelete(order: CompletationOrder) {
    const index: number = this._ordersToComplete.indexOf(order);

    if (index !== -1) {
      this._ordersToComplete.splice(index, 1)
    } else {
      console.log('Trying to remove non existing order: ', order);
    }
    this._ordersToComplete$.next(this._ordersToComplete);
  }

}
