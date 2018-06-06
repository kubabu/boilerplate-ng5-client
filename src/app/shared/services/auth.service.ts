import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { Observable } from 'rxjs/Observable';

import { TokenRequest } from 'app/models/token-request';
import { TokenResponse } from 'app/models/token-response';
import { AuthConnectorService } from './auth-connector.service';
import { AuthenticationConfiguration } from 'app/config/auth-config';


@Injectable()
export class AuthenticationService {

  constructor(
    private menu: SidebarService,
    private router: Router,
    private authConnector: AuthConnectorService,
    private authConfig: AuthenticationConfiguration,
  ) {

  }

  login(username: string, password: string) {
    const tokenRequest = new TokenRequest();
    tokenRequest.Username = username;
    tokenRequest.Password = password;

    this.authConnector.loginPost(tokenRequest)
      .subscribe(resp => this.onTokenResponse(resp, this.authConfig));
  }


  onTokenResponse(response: TokenResponse, authConfig: AuthenticationConfiguration) {
    // login successful if there's a jwt token in the response
    if (response.user && response.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      const validTo = new Date(Date.parse(response.validTo));
      localStorage.setItem(authConfig.userKey, JSON.stringify(response.user));
      localStorage.setItem(authConfig.tokenKey, response.token);
      localStorage.setItem(authConfig.validToKey, response.validTo);

      this.router.navigate(['/']);
    }
  }

  logout() {
    this.menu.close();

    // remove user from local storage to log user out
    localStorage.removeItem(this.authConfig.userKey);
    this.router.navigate([this.authConfig.loginRoute]);
  }

  validTo(): Date {
    const validTo = localStorage.getItem(this.authConfig.validToKey);
    return this.parseValidTo(validTo);
  }

  private parseValidTo(validTo: string): Date {
    return new Date(Date.parse(validTo));
  }

  public isValidYet(): boolean {
    const validTo = this.validTo();
    const now = new Date();
    const isValidYet = validTo > now;

    return isValidYet;
  }

  public isAuthenticated(): boolean {

    const user = localStorage.getItem(this.authConfig.userKey);
    const token = localStorage.getItem(this.authConfig.tokenKey);
    // check if token is still valid
    return (user != null && token != null && this.isValidYet());
  }

  // todo: urlAfterAuth: string = ''
  public handleAuthentication(): void {

    if (!this.isAuthenticated()) {
      this.router.navigate([this.authConfig.loginRoute]);
    }
  }

}
