import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { ApiConfiguration } from 'app/config/api-config';
import { TokenRequest } from 'app/models/token-request';

@Injectable()
export class AuthConnectorService {

  private _log: string[];
  private authUrl: string;

  constructor(
    private apiConfig: ApiConfiguration,
    private http: HttpClient,

  ) {
    this.authUrl = apiConfig.ApiUrl + '/auth';
    this._log = [];
  }

  loginPost(tokenRequest: TokenRequest): Observable<any> {
    return this.http.post(this.authUrl, tokenRequest, this.apiConfig.httpOptions).pipe(
      tap(_ => this._log.push(`added user id=${tokenRequest.Username}`)),
      catchError(this.handleError<any>('adduser')),
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this._log.push(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
