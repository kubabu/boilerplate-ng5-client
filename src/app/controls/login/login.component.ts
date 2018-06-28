import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from 'app/services/auth/authentication.service';
import { AuthConnectorService } from 'app/services/auth/auth-connector.service';
import { Subject } from 'rxjs/Subject';
import { AuthNavigateService } from 'app/services/auth/auth-navigate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  isLoading = false;
  errorMessagesSubject$: Subject<string>;
  errorMessage: Observable<string>;


  constructor(
    private auth: AuthenticationService,
    private authConn: AuthConnectorService,
    private authNav: AuthNavigateService,
  ) {
    this.errorMessagesSubject$ = new Subject<string>();
    this.errorMessage = this.errorMessagesSubject$.asObservable();
    this.authConn.errorMessage$
      .subscribe(msg => {
        this.isLoading = false;
        this.errorMessagesSubject$.next(msg);
      });
  }


  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.authNav.navigateAfterLogin();
    }
  }

  login(username, password) {
    this.isLoading = true;
    this.errorMessagesSubject$.next('Loguję się...');
    this.auth.login(username, password)
  }

}
