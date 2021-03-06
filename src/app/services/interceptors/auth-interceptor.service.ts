import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

import { AuthenticationStoreService } from 'app/services/auth/auth-store.service';
import { LogoutService } from 'app/services/auth/logout.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private authStore: AuthenticationStoreService,
        private logoutService: LogoutService,
        public snackBar: MatSnackBar,
    ) { }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = this.authStore.getTokenValue();
        let interceptedReq: HttpRequest<any> = req;

        if (idToken) {
            interceptedReq = req.clone({
                headers: req.headers.set('Authorization',
                    'Bearer ' + idToken),
            });
        }
        return next.handle(interceptedReq).do((event: HttpEvent<any>) => {}, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 0) {
                    // API is unavailable
                    this.snackBar.open('Serwer niedostępny', 'OK');
                    // this.logoutService.logout();
                } else if (err.status === 401) {
                    // unauthorized. JWT expired without handlinf or other problem. User needs to relogin
                    console.log('Unauthorized. JWT expired or other problem. User needs to relogin');
                    this.snackBar.open('Uwierzytelnianie nie działa', 'OK');
                    this.logoutService.logout();
                }
                // do error handling here
                // console.log(err.message);
            }
        });
    }

}
