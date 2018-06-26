import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationConfiguration {
  public token = 'currentToken';
  public tokenKey = 'id_token';
  public loginRoute = '/login';
};
