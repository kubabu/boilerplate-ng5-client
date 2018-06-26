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
}
