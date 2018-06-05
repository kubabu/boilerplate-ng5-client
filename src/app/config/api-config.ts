import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiConfiguration {
    public ApiUrl = environment.apiUrl;

    public httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
};

