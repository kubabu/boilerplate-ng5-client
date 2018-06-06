import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { ApiConfiguration } from 'app/config/api-config';
import { TokenRequest } from 'app/models/token-request';
import { TokenResponse } from 'app/models/token-response';

@Injectable()
export class AuthConnectorService {

  private authUrl: string;

  constructor(
    private apiConfig: ApiConfiguration,
    private http: HttpClient,

  ) {
    this.authUrl = apiConfig.ApiUrl + '/auth';
  }

  loginRequest(tokenRequest: TokenRequest): Observable<any> {
    return this.http.post(this.authUrl, tokenRequest, this.apiConfig.httpOptions);
  }

}
