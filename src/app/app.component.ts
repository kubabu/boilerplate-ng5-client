import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AuthenticationService } from 'app/shared/services/auth.service';
import { SidenavItem } from 'app/models/sidenav-item';
import { SidebarService } from 'app/shared/services/sidebar.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  isDarkTheme = false;
  title = 'ONIX Web client';

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    public sidebar: SidebarService,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle( this.title );

    this.auth.handleAuthentication();
    // this.router.navigateByUrl('/barcode')
  }

  toggleSidenav() {
    this.sidebar.toggle();
  }

}
