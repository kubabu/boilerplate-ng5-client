import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  errorMessage: Observable<string>;


  constructor(
    private auth: AuthenticationService,
  ) {
    this.errorMessage = auth.errorMessage$;
  }


  ngOnInit() { }

  login(username, password) {
    this.auth.login(username, password)
  }

}
