import { User } from './user';
import { TokenResponse } from './token-response';

export class TokenLocalStorageItem {
    // Wraps TokenResponse to expose usable Date after reading from API or local storage

    public token: string;
    public validTo: Date;
    public user: User;


    constructor(response: TokenResponse) {

        this.user = response.user;
        this.token = response.token;
        this.validTo = new Date(Date.parse(response.validTo));
    }


    public isExpired(): boolean {
        return this.validTo < new Date();
    }

    public isValid(): boolean {
        return this.user != null && this.token != null &&  !this.isExpired();
    }
}
