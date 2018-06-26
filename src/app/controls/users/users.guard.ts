import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CanLoadUsersSection implements CanLoad {

    canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
        return true;
    }
}
