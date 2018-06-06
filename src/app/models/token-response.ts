import { User } from './user';

export class TokenResponse {
    public token: string;
    public validTo: string;
    public user: User;
}
