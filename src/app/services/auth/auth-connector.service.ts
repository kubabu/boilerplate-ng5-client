import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ApiConfiguration } from 'app/config/api-config';
import { TokenRequest } from 'app/models/token-request';
import { TokenResponse } from 'app/models/token-response';

@Injectable()
export class AuthConnectorService {

  private authUrl: string;
  private erorrSubject$: Subject<string>;
  errorMessage$: Observable<string>;


  constructor(
    private apiConfig: ApiConfiguration,
    private http: HttpClient,

  ) {
    this.authUrl = apiConfig.ApiUrl + '/auth';
    this.erorrSubject$ = new Subject<string>();
    this.errorMessage$ = this.erorrSubject$.asObservable();
  }


  loginRequest(tokenRequest: TokenRequest): Observable<any> {

    return this.http.post(this.authUrl, tokenRequest, this.apiConfig.httpOptions).pipe(
      tap(_ => this.erorrSubject$.next('')),
      catchError(this.handleError<any>('loginRequest')),
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: better job of transforming error for user consumption
      let msg: string;
      if (typeof(error.error) === 'string') {
        // 404 or other response from server
        msg = error.error
      } else {
        if (error.status === 0) {
          // server is down
          msg = 'Serwer danych niedostępny. Powiadom administratora.'
        } else {
          msg = error.message;
        }
      }
      this.erorrSubject$.next(msg);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
