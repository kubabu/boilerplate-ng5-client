import { Injectable } from '@angular/core';
import { AuthenticationConfiguration } from 'app/config/auth-config';
import { User } from 'app/models/user';
import { TokenLocalStorageItem } from 'app/models/token-local-item';
import { TokenResponse } from 'app/models/token-response';


@Injectable()
export class AuthenticationStoreService {
  // local storage for auth data
  private token: TokenLocalStorageItem;


  constructor(private authConfig: AuthenticationConfiguration) {  }


  saveToken(response: TokenResponse) {
    localStorage.setItem(this.authConfig.token, JSON.stringify(response));
    // duplicated token storage to avoid type casting, it miight be premature optimalization
    this.token = new TokenLocalStorageItem(response);
  }

  clearToken() {
    // remove token and user from local storage to log user out
    localStorage.removeItem(this.authConfig.token);
    this.token = null;
  }


  getToken(): TokenLocalStorageItem {
    if (this.token != null) {
      return this.token;
    } else {
      return this.loadToken();
    }
  }

  getUser(): User {
    return this.getToken().user;
  }

  private parseValidTo(validTo: string): Date {
    return new Date(Date.parse(validTo));
  }

  private loadToken(): TokenLocalStorageItem {
    try {
      const tokenJson = localStorage.getItem(this.authConfig.token);
      const response = JSON.parse(tokenJson) as TokenResponse;
      const tokenItem = new TokenLocalStorageItem(response);

      return tokenItem;
    } catch (error) {
      return null;
    }
  }
}
