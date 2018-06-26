import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { AuthenticationStoreService } from 'app/services/auth/auth-store.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = AuthenticationStoreService.getTokenValue();
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
            } else if (err.status === 401) {
                // unauthorized. JWT expired or other problem? auth.logout()
            }
            // do error handling here
            // console.log(err.message);
        }
    });
  }

}
