import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { retry } from 'rxjs/operators/retry';
import { concat } from 'rxjs/observable/concat';

import { ApiConfiguration } from '../config/api-config';
import { Hero } from '../models/hero';
import { MessageService } from './message.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};



@Injectable()
export class HeroService {
  getHero(id: number): Observable<Hero> {
    throw new Error('Method not implemented.');
  }
  getHeroes(): Observable<Hero[]> {
    throw new Error('Method not implemented.');
  }
  updateHero(hero: Hero): Observable<any> {
    throw new Error('Method not implemented.');
  }
  addHero(hero: Hero): Observable<any> {
    throw new Error('Method not implemented.');
  }
  deleteHero(hero: number | Hero): Observable<any> {
    throw new Error('Method not implemented.');
  }
  searchHeroes(term: string): Observable<Hero[]> {
    throw new Error('Method not implemented.');
  }
}


@Injectable()
export class HeroHttpService extends HeroService {

  private heroesUrl;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private apiConfig: ApiConfiguration,
  ) {
    super();
    this.heroesUrl = apiConfig.ApiUrl + '/Heroes';
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

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log('fetched hero ID=${id}')),
        catchError(this.handleError<Hero>('getHero id=${id}')),
      );
  }

  getHeroes (): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log(`fetched num=${heroes.length} heroes`)),
        catchError(this.handleError('getHeroes', [])),
      );
  }

  updateHero(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http.put(url, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero')),
    );
  }

  addHero(hero: Hero): Observable<any> {
    return this.http.post(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`added hero id=${hero.id}`)),
      catchError(this.handleError<any>('addHero')),
    );
  }

  deleteHero(hero: Hero | number): Observable<any> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<any>('deleteHero')),
    );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]); // empty term, return empty list
    }
    const url = `${this.heroesUrl}/?term=${term}`;

    return this.http.get<Hero[]>(url).pipe(
      tap(_ => this.log('found heroes matching ${term}')),
      catchError(this.handleError<Hero[]>('searchHeroes', [])),
    );
  }

}
