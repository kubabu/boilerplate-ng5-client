import { Injectable } from '@angular/core';
import { AuthenticationConfiguration } from 'app/config/auth-config';
import { User } from 'app/models/user';
import { TokenLocalStorageItem } from 'app/models/token-local-item';
import { TokenResponse } from 'app/models/token-response';


@Injectable()
export class AuthenticationStoreService {
  // local storage for auth data

  constructor(private authConfig: AuthenticationConfiguration) {  }


  saveToken(response: TokenResponse) {
    localStorage.setItem(this.authConfig.tokenKey, JSON.stringify(response));
  }

  clearToken() {
    // remove token and user from local storage to log user out
    localStorage.removeItem(this.authConfig.tokenKey);
  }

  getUser(): User {
    return this.getToken().user;
  }

  getToken(): TokenLocalStorageItem {
    try {
      const tokenJson = localStorage.getItem(this.authConfig.tokenKey);
      const response = JSON.parse(tokenJson) as TokenResponse;
      const tokenItem = new TokenLocalStorageItem(response);

      return tokenItem;

    } catch (error) {
      return null;
    }
  }

  private parseValidTo(validTo: string): Date {
    return new Date(Date.parse(validTo));
  }

}
