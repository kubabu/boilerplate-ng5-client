import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const idToken = localStorage.getItem('id_token');
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
            }
            // do error handling here
            // console.log(err.message);
        }
    });
  }

}
