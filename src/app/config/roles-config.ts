import { Injectable } from '@angular/core';

@Injectable()
export class RolesConfiguration {
    public allowedRoles = [
        { value: '', viewValue: 'Żadna'},
        // { value: 'Bot', viewValue: 'Bot'},
        { value: 'User', viewValue: 'Użytkownik'},
        { value: 'Admin', viewValue: 'Administrator'},
        { value: 'Dev', viewValue: 'Programista'},
    ];

    public usersGroupRoles = ['user', 'admin', 'dev'];
    public adminsGroupRoles = ['admin', 'dev'];

    public isAdmin(role: string): boolean {
        return this.adminsGroupRoles.indexOf(role) !== -1;
    }

    public isUser(role: string): boolean {
        return this.usersGroupRoles.indexOf(role) !== -1;
    }
}
