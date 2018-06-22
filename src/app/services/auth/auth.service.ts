import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';

import { TokenRequest } from 'app/models/token-request';
import { TokenLocalStorageItem } from 'app/models/token-local-item';
import { TokenResponse } from 'app/models/token-response';
import { AuthConnectorService } from 'app/services/auth/auth-connector.service';
import { AuthenticationStoreService } from 'app/services/auth/auth-store.service';
import { AuthNavigateService } from 'app/services/auth/auth-navigate.service';


@Injectable()
export class AuthenticationService {

  private tokenRequest: TokenRequest;
  private isAuthenticatedSource$: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  constructor(
    private authConnector: AuthConnectorService,
    private authStore: AuthenticationStoreService,
    private navigateService: AuthNavigateService,
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
      this.navigateService.navigateAfterLogin();

      // setup observable timer to request new token just before this one expires
      const responseObject = new TokenLocalStorageItem(response);
      // TODO: move it somewhere it will be executed on every app load, test
      // add extend authorization endpoint in API for already authorized users, so we dont need to store password in browser
      this.setReloadTimer(responseObject.validTo)
        .subscribe(_ => {
          this.login(this.tokenRequest.Username, this.tokenRequest.Password);
        });
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
    this.navigateService.navigateToLoginUrl();
  }

  private isAuthenticated(): boolean {
    // check if token is still valid
    const token = this.authStore.getToken();
    const isAuthenticated = token != null && token.isValid();
    this.isAuthenticatedSource$.next(isAuthenticated);

    return isAuthenticated;
  }

  public handleAuthentication(launchUrl: string): void {
    this.navigateService.setLaunchUrl(launchUrl);
    if (!this.isAuthenticated()) {
      this.navigateService.navigateToLoginUrl();
    } else {
      this.navigateService.navigateAfterLogin();
    }
  }

}
