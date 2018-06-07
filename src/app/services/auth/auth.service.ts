import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { Subject } from 'rxjs/Subject';

import { AuthenticationConfiguration } from 'app/config/auth-config';
import { TokenLocalStorageItem } from 'app/models/token-local-item';
import { TokenRequest } from 'app/models/token-request';
import { TokenResponse } from 'app/models/token-response';
import { User } from 'app/models/user';
import { AuthConnectorService } from 'app/services/auth/auth-connector.service';
import { SidebarService } from 'app/shared/services/sidebar.service';
import { AuthenticationStoreService } from 'app/services/auth/auth-store.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class AuthenticationService {

  private tokenRequest: TokenRequest;
  private isAuthenticatedSource$: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  constructor(
    private authConfig: AuthenticationConfiguration,
    private authConnector: AuthConnectorService,
    private authStore: AuthenticationStoreService,
    private router: Router,
  ) {
    this.isAuthenticatedSource$ = new BehaviorSubject<boolean>(false);
    this.isAuthenticated$ = this.isAuthenticatedSource$.asObservable();
  }

  login(username: string, password: string) {
    // save token request data to resent before expiration
    this.tokenRequest = new TokenRequest();
    this.tokenRequest.Username = username;
    this.tokenRequest.Password = password;

    this.authConnector.loginRequest(this.tokenRequest)
      .subscribe(
        resp => this.onTokenResponse(resp),
      );
  }

  onTokenResponse(response: TokenResponse) {
    // login successful if there's a jwt token in the response
    if (response != null && response.user && response.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      this.authStore.saveToken(response);
      this.isAuthenticatedSource$.next(true);
      this.navigateAfterLogin();

      // setup observable timer to request new token just before this one expires
      // const responseObject = new TokenLocalStorageItem(response);
      // TODO: test
      // this.setReloadTimer(responseObject.validTo)
      //   .subscribe(_ => this.login(this.tokenRequest.Username, this.tokenRequest.Password));
    }
  }

  setReloadTimer(when: Date): Observable<number> {
    const now = new Date();
    const second = 1000; // call one second before expiration
    const expirationTimedelta = when.getTime() - now.getTime() - second;

    return timer(expirationTimedelta);
  }

  logout() {
    this.authStore.clearToken();
    this.isAuthenticatedSource$.next(false);
    this.navigateToLogin();
  }

  private isAuthenticated(): boolean {
    // check if token is still valid
    const token = this.authStore.getToken();

    return token != null && token.isValid();
  }

  // todo: move to separate Auth navigation service
  public handleAuthentication(): void {
    if (!this.isAuthenticated()) {
      this.navigateToLogin();
    } else {
      this.navigateAfterLogin();
    }
  }

  navigateAfterLogin() {
    const token = this.authStore.getToken();
    if (token != null) {
      const startupUri = token.user.startupUri;
      if (startupUri != null && startupUri !== '') {
        this.router.navigate([startupUri]);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  navigateToLogin() {
    this.router.navigate([this.authConfig.loginRoute]);
  }
}
