import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
  ) { }

  ngOnInit() { }

  login(username, password) {
    this.auth.loginRequest(username, password)
  }

}
