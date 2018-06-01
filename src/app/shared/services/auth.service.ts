import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { User } from './../../models/user';
import { Router } from '@angular/router';
import { SidebarService } from './sidebar.service';

@Injectable()
export class AuthenticationService {

    user: User;

    constructor(private router: Router,
              private http: Http,
              private menu: SidebarService,
  ) { }


  login(username: string, password: string) {


    const user: User = new User({
      id: 1,
      name: 'Admin',
    });
    //   lastName: 'Admin',
    //   username: username,
    //   password: password
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.router.navigate(['/']);

    // return this.http.post(this.config.apiUrl + '/users/authenticate', { username: username, password: password })
    //   .map((response: Response) => {
    //     // login successful if there's a jwt token in the response
    //     let user = response.json();
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


  public handleAuthentication(): void {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }


}
