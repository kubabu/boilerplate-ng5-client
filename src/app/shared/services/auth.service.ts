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


@Injectable()
export class AuthenticationService {

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
    this.usersUrl = apiConfig.ApiUrl + '/users';
  }

  usersReq(username: string): Observable<any> {
    return this.http.get<User[]>(this.usersUrl);
  }

  loginRequest(username: string, password: string) {
    const tokenRequest = new TokenRequest();
    tokenRequest.Username = username;
    tokenRequest.Password = password;

    return this.http.post(this.authUrl, tokenRequest, this.apiConfig.httpOptions)
      .subscribe(this.onTokenResponse);
  }

  onTokenResponse(response: Response) {
    // login successful if there's a jwt token in the response
    const respJson = response.json();
    const user = respJson.user;
    if (user && user.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      // this.router.navigate(['/']);
    }
  }

  logout() {
    this.menu.close();

    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  public isAuthenticated(): boolean {

    const user = localStorage.getItem('currentUser');
    return (user != null);
  }

  // todo: urlAfterAuth: string = ''
  public handleAuthentication(): void {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }


}
