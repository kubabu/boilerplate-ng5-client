import { Injectable } from '@angular/core';
import { AuthenticationStoreService } from 'app/services/auth/auth-store.service';
import { RolesService } from 'app/services/auth/roles-service';

@Injectable()
export class AuthorizationService {

    constructor(
      private authStore: AuthenticationStoreService,
      private rolesConfig: RolesService,
    ) {

    }

    isAdmin(): boolean {
        const token = this.authStore.getToken();
        const userRole = token.user.role;
        if (token != null && token.isValid()) {
            if (this.rolesConfig.isAdmin(userRole)) {
                return true;
            }
        }
        return false;
    }

    isUser(): boolean {
        const token = this.authStore.getToken();
        const userRole = token.user.role;
        if (token != null && token.isValid()) {
            if (this.rolesConfig.isUser(userRole)) {
                return true;
            }
        }
        return false;
    }
}
