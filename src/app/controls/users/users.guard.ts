import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Observable } from 'rxjs/Observable';
import { AuthorizationService } from 'app/services/auth/authorization.service';


@Injectable()
export class CanLoadUsersSection implements CanLoad {

    constructor(private authService: AuthorizationService) { }

    canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean {
        return this.authService.isAdmin();
    }
}
