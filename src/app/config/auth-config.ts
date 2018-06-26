import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationConfiguration {
  public static token = 'currentToken';
  public static tokenKey = 'id_token';
  public loginRoute = '/login';
};
