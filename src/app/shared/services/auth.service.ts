import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { AuthenticationConfiguration } from 'app/config/auth-config';
import { TokenLocalStorageItem } from 'app/models/token-local-item';
import { TokenRequest } from 'app/models/token-request';
import { TokenResponse } from 'app/models/token-response';
import { User } from 'app/models/user';
import { AuthConnectorService } from 'app/shared/services/auth-connector.service';
import { SidebarService } from 'app/shared/services/sidebar.service';
import { AuthenticationStoreService } from 'app/shared/services/auth-store.service';


@Injectable()
export class AuthenticationService {

  private user: User;
  private erorrSubject$: Subject<string>;
  errorMessage$: Observable<string>;


  constructor(
    private authConfig: AuthenticationConfiguration,
    private authConnector: AuthConnectorService,
    private authStore: AuthenticationStoreService,
    private menu: SidebarService,
    private router: Router,
  ) {
    this.erorrSubject$ = new Subject<string>();
    this.errorMessage$ = this.erorrSubject$.asObservable();
  }

  login(username: string, password: string) {
    const tokenRequest = new TokenRequest();
    tokenRequest.Username = username;
    tokenRequest.Password = password;

    this.authConnector.loginRequest(tokenRequest)
      .subscribe(
        resp => this.onTokenResponse(resp),
        err => this.onLoginError(err),
      );
  }

  onTokenResponse(response: TokenResponse) {
    // login successful if there's a jwt token in the response
    if (response != null && response.user && response.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      this.erorrSubject$.next('');
      this.authStore.saveToken(response);

      const startupUri = response.user.startupUri;
      if (startupUri != null && startupUri !== '') {
        this.router.navigate([startupUri]);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  onLoginError(response: HttpErrorResponse) {
    this.erorrSubject$.next(response.error);
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
