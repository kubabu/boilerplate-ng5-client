import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiConfiguration {
    private ApiUrl = environment.apiUrl;
    public HubReconnectTimeoutMs = 5000;

    public httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    public getAuthPath(): string { return `${this.ApiUrl}/api/auth` }
    public getCompletationHubPath(): string { return `${this.ApiUrl}/Hubs/CompletationOrders` }
    public getCompletationOrdersPath(): string { return `${this.ApiUrl}/api/completationOrders` }
    public getUsersPath(): string { return `${this.ApiUrl}/api/users` }
};

