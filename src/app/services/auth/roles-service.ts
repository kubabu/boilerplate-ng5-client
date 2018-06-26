import { Injectable } from '@angular/core';
import { RolesConfiguration } from 'app/config/roles-config';

@Injectable()
export class RolesService {

    constructor(private rolesConfig: RolesConfiguration) { }

    public isAdmin(role: string): boolean {
        return this.rolesConfig.adminsGroupRoles.indexOf(role.toLocaleLowerCase()) !== -1;
    }

    public isUser(role: string): boolean {
        return this.rolesConfig.usersGroupRoles.indexOf(role.toLocaleLowerCase()) !== -1;
    }
}
