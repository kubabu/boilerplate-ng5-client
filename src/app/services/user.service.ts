import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { retry } from 'rxjs/operators/retry';
import { concat } from 'rxjs/observable/concat';

import { ApiConfiguration } from '../config/api-config';
import { User } from '../models/user';
import { MessageService } from './message.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};



@Injectable()
export class UserService {
  getUser(id: number): Observable<User> {
    throw new Error('Method not implemented.');
  }
  getUsers(): Observable<User[]> {
    throw new Error('Method not implemented.');
  }
  updateUser(user: User): Observable<any> {
    throw new Error('Method not implemented.');
  }
  addUser(user: User): Observable<any> {
    throw new Error('Method not implemented.');
  }
  deleteUser(user: number | User): Observable<any> {
    throw new Error('Method not implemented.');
  }
  searchUsers(term: string): Observable<User[]> {
    throw new Error('Method not implemented.');
  }
}


@Injectable()
export class UserHttpService extends UserService {

  private usersUrl;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private apiConfig: ApiConfiguration,
  ) {
    super();
    this.usersUrl = apiConfig.ApiUrl + '/users';
   }

  private log(message: string) {
    this.messageService.add(message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;

    return this.http.get<User>(url)
      .pipe(
        tap(_ => this.log('fetched user ID=${id}')),
        catchError(this.handleError<User>('getuser id=${id}')),
      );
  }

  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(useres => this.log(`fetched num=${useres.length} useres`)),
        catchError(this.handleError('getuseres', [])),
      );
  }

  updateUser(user: User): Observable<any> {
    const url = `${this.usersUrl}/${user.id}`;

    return this.http.put(url, user, httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateuser')),
    );
  }

  addUser(user: User): Observable<any> {
    return this.http.post(this.usersUrl, user, httpOptions).pipe(
      tap(_ => this.log(`added user id=${user.id}`)),
      catchError(this.handleError<any>('adduser')),
    );
  }

  deleteUser(user: User | number): Observable<any> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete(url, httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<any>('deleteuser')),
    );
  }

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]); // empty term, return empty list
    }
    const url = `${this.usersUrl}/?term=${term}`;

    return this.http.get<User[]>(url).pipe(
      tap(_ => this.log('found useres matching ${term}')),
      catchError(this.handleError<User[]>('searchuseres', [])),
    );
  }

}