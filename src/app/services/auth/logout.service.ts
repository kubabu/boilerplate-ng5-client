import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class LogoutService {
    private logoutSubject$: Subject<boolean>;
    public logout$: Observable<boolean>;

    constructor() {
        this.logoutSubject$ = new Subject<boolean>();
        this.logout$ = this.logoutSubject$.asObservable();
    }


    logout() {
        this.logoutSubject$.next(false);
    }
}
