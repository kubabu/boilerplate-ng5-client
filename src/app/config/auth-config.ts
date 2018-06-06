import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationConfiguration {
  public loginRoute = '/login';
  public userKey = 'currentUser';
  public tokenKey = 'currentToken';
  public validToKey = 'tokenValidTo'
};
