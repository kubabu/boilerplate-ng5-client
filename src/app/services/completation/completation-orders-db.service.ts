import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ApiConfiguration } from 'app/config/api-config';
import { CompletationOrder } from 'app/models/completation-order';


@Injectable()
export class CompletationOrdersDbService {
  private url: string;


  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfiguration) {
    this.url = apiConfig.getCompletationOrdersPath();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Error is caught by interceptor
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getCompletationOrder(id: number): Observable<CompletationOrder> {
    const url = `${this.url}/${id}`;

    return this.http.get<CompletationOrder>(url);
  }

  getCompletationOrders (): Observable<CompletationOrder[]> {
    return this.http.get<CompletationOrder[]>(this.url);
  }

  updateCompletationOrder(order: CompletationOrder): Observable<any> {
    const url = `${this.url}/${order.id}`;

    return this.http.put(url, order, this.apiConfig.httpOptions);
  }

  addCompletationOrder(order: CompletationOrder): Observable<any> {
    return this.http.post(this.url, order, this.apiConfig.httpOptions);
  }

  deleteCompletationOrder(order: CompletationOrder | number): Observable<any> {
    const id = typeof order === 'number' ? order : order.id;
    const url = `${this.url}/${id}`;

    return this.http.delete(url, this.apiConfig.httpOptions);
  }

  searchCompletationOrders(term: string): Observable<CompletationOrder[]> {
    if (!term.trim()) {
      return of([]); // empty term, return empty list
    }
    const url = `${this.url}/?term=${term}`;

    return this.http.get<CompletationOrder[]>(url);
  }

}
