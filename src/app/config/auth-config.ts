import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationConfiguration {
  public loginRoute = '/login';
  public token = 'currentToken';
};
