import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from 'app/services/auth/auth.service';
import { AuthConnectorService } from 'app/services/auth/auth-connector.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  errorMessage: Observable<string>;


  constructor(
    private auth: AuthenticationService,
    private authConn: AuthConnectorService,
  ) {
    this.errorMessage = authConn.errorMessage$;
  }


  ngOnInit() { }

  login(username, password) {
    this.auth.login(username, password)
  }

}
