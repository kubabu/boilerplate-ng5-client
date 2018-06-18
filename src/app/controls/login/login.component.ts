import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from 'app/services/auth/auth.service';
import { AuthConnectorService } from 'app/services/auth/auth-connector.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  errorMessagesSubject$: Subject<string>;
  errorMessage: Observable<string>;


  constructor(
    private auth: AuthenticationService,
    private authConn: AuthConnectorService,
  ) {
    this.errorMessagesSubject$ = new Subject<string>();
    this.errorMessage = this.errorMessagesSubject$.asObservable();
    this.authConn.errorMessage$
      .subscribe(msg => this.errorMessagesSubject$.next(msg));
  }


  ngOnInit() { }

  login(username, password) {
    this.errorMessagesSubject$.next('Loguję się...');
    this.auth.login(username, password)
  }

}
