import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { User } from 'app/models/user';
import { ApiConfiguration } from 'app/config/api-config';
import { TokenRequest } from 'app/models/token-request';
import { UserService } from '../../services/user.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { TokenResponse } from 'app/models/token-response';


@Injectable()
export class AuthenticationService {

  private _log: string[];
  private userKey = 'currentUser';
  private tokenKey = 'currentToken';

  user: User;
  authUrl: string;
  usersUrl: string;

  constructor(
    private apiConfig: ApiConfiguration,
    private http: HttpClient,
    private menu: SidebarService,
    private router: Router,
    private userservice: UserService,
  ) {
    this.authUrl = apiConfig.ApiUrl + '/auth';
    this._log = [];
  }

  usersReq(username: string): Observable<any> {
    return this.http.get<User[]>(this.usersUrl);
  }

  loginRequest(username: string, password: string) {
    const tokenRequest = new TokenRequest();
    tokenRequest.Username = username;
    tokenRequest.Password = password;

    this.loginPost(tokenRequest)
      .subscribe(this.onTokenResponse);
  }

  loginPost(tokenRequest: TokenRequest): Observable<any> {
    return this.http.post(this.authUrl, tokenRequest, this.apiConfig.httpOptions).pipe(
      tap(_ => this._log.push(`added user id=${tokenRequest.Username}`)),
      catchError(this.handleError<any>('adduser')),
    );
  }

  onTokenResponse(response: TokenResponse) {
    // login successful if there's a jwt token in the response
    if (response.user && response.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      const validTo = new Date(Date.parse(response.validTo));
      localStorage.setItem(this.userKey, JSON.stringify(response.user));
      localStorage.setItem(this.tokenKey, response.token);
      // this.router.navigate(['/']);
    }
  }

  logout() {
    this.menu.close();

    // remove user from local storage to log user out
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {

    const user = localStorage.getItem(this.userKey);
    // check if token is still valid
    return (user != null);
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

  // todo: urlAfterAuth: string = ''
  public handleAuthentication(): void {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }


}
