import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Title } from '@angular/platform-browser';

import { AuthenticationService } from 'app/services/auth/auth.service';
import { SidebarService } from 'app/shared/services/sidebar.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}],
})

export class AppComponent implements OnInit {
  isDarkTheme = false;
  title = 'ONIX Web client';

  constructor(
    private auth: AuthenticationService,
    public sidebar: SidebarService,
    private titleService: Title,
    private location: Location) { }

  ngOnInit() {
    this.titleService.setTitle( this.title );

    this.auth.handleAuthentication(this.location.path());
  }
}

