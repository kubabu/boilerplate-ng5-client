import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { Observable } from 'rxjs/Observable';

import { AuthenticationConfiguration } from 'app/config/auth-config';
import { TokenLocalStorageItem } from 'app/models/token-local-item';
import { TokenRequest } from 'app/models/token-request';
import { TokenResponse } from 'app/models/token-response';
import { User } from 'app/models/user';
import { AuthConnectorService } from 'app/shared/services/auth-connector.service';
import { AuthenticationStoreService } from 'app/shared/services/auth-store.service';


@Injectable()
export class AuthenticationService {

  private user: User;

  constructor(
    private authConfig: AuthenticationConfiguration,
    private authConnector: AuthConnectorService,
    private authStore: AuthenticationStoreService,
    private menu: SidebarService,
    private router: Router,
  ) {

  }

  login(username: string, password: string) {
    const tokenRequest = new TokenRequest();
    tokenRequest.Username = username;
    tokenRequest.Password = password;

    this.authConnector.loginPost(tokenRequest)
      .subscribe(resp => this.onTokenResponse(resp));
  }

  onTokenResponse(response: TokenResponse) {
    // login successful if there's a jwt token in the response
    if (response.user && response.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      this.authStore.saveToken(response);

      // todo: urlAfterAuth: string = ''
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.menu.close();

    this.authStore.clearToken();

    this.router.navigate([this.authConfig.loginRoute]);
  }

  public isAuthenticated(): boolean {

    // check if token is still valid
    const token = this.authStore.getToken();

    return token != null && token.isValid();
  }

  public handleAuthentication(): void {

    if (!this.isAuthenticated()) {
      this.router.navigate([this.authConfig.loginRoute]);
    }
  }
}
