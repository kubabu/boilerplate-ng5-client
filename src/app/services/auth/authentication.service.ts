import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';

import { TokenRequest } from 'app/models/auth/token-request';
import { TokenResponse } from 'app/models/auth/token-response';
import { AuthConnectorService } from 'app/services/auth/auth-connector.service';
import { AuthenticationStoreService } from 'app/services/auth/auth-store.service';
import { AuthNavigateService } from 'app/services/auth/auth-navigate.service';
import { TokenReissueRequest } from 'app/models/auth/token-reissue-request';
import { LogoutService } from './logout.service';


@Injectable()
export class AuthenticationService {

  private tokenRequest: TokenRequest;
  private tokenReissueRequest: TokenReissueRequest;
  private isAuthenticatedSource$: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  constructor(
    private authConnector: AuthConnectorService,
    private authStore: AuthenticationStoreService,
    private navigateService: AuthNavigateService,
    private logoutService: LogoutService,
  ) {
    this.isAuthenticatedSource$ = new BehaviorSubject<boolean>(false);
    this.isAuthenticated$ = this.isAuthenticatedSource$.asObservable();
    this.logoutService.logout$.subscribe(() => this.logout());
  }

  public login(username: string, password: string) {
    // save token request data to be able to retry login
    this.tokenRequest = new TokenRequest();
    this.tokenRequest.Username = username;
    this.tokenRequest.Password = password;

    this.authConnector.loginRequest(this.tokenRequest)
      .subscribe(
        resp => this.onTokenResponse(resp),
        // error = > // setup timer and retry
      );
  }

  public isAuthenticated(): boolean {
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
      // client has valid token, setup reissue request
      this.setupJwtReissue();
      this.navigateService.navigateAfterLogin();
    }
  }

  private onTokenResponse(response: TokenResponse) {
    // login successful if there's a jwt token in the response
    if (response != null && response.user && response.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      this.authStore.saveToken(response);
      this.isAuthenticatedSource$.next(true);
      this.navigateService.navigateAfterLogin();
      // client has valid token, setup reissue request
      this.setupJwtReissue();
    }
  }

  private setupJwtReissue() {
    // it needs to be be executed on every app load scenario
    // when client already has valid token
    const tokenResponse = this.authStore.getToken();
    // cache login, token to request JWT reissue
    this.tokenReissueRequest = new TokenReissueRequest();
    this.tokenReissueRequest.Username = tokenResponse.user.name;
    this.tokenReissueRequest.Token = tokenResponse.token;
    // setup observable timer to request new token just before this one expires
    this.setReloadTimer(tokenResponse.validTo)
      .subscribe(_ => {
        this.authConnector.jwtReissueRequest(this.tokenReissueRequest)
          .subscribe(
            resp => this.onTokenResponse(resp),
            // error => wait few minutes and retry?
          );
      });
  }

  private setReloadTimer(when: Date): Observable<number> {
    const now = new Date();
    const second = 1000; // call one second before expiration
    const expirationTimedelta = when.getTime() - now.getTime() - second;

    return timer(expirationTimedelta);
  }

  private logout() {
    this.authStore.clearToken();
    this.isAuthenticatedSource$.next(false);
    this.navigateService.navigateToLoginUrl();
  }

}
