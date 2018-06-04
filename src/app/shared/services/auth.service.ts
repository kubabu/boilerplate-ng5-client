import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { User } from 'app/models/user';
import { Router } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from 'app/config/api-config';

@Injectable()
export class AuthenticationService {

  user: User;
  authUrl: string;

  constructor(
    private apiConfig: ApiConfiguration,
    private http: HttpClient,
    private menu: SidebarService,
    private router: Router,
  ) {
    this.authUrl = apiConfig.ApiUrl + '/auth';
  }


  login(username: string, password: string) {

    const t_user: User = new User({
      id: 1,
      name: 'Admin',
    });

    localStorage.setItem('currentUser', JSON.stringify(t_user));
    this.router.navigate(['/']);

    // return this.http.post(this.authUrl, { username: username, password: password })
    //   .map((response: Response) => {
    //     // login successful if there's a jwt token in the response
    //     const user = response.json();
    //     if (user && user.token) {
    //       // store user details and jwt token in local storage to keep user logged in between page refreshes
    //       localStorage.setItem('currentUser', JSON.stringify(user));
    //     }
    //   });


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
