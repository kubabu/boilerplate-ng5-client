import { UserViewModel } from './user-view-model';

export class TokenResponse {
    public token: string;
    public validTo: string;
    public user: UserViewModel;
}
