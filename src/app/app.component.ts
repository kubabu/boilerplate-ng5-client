import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SidenavItem } from './models/sidenav-item';
import { SidebarService } from './shared/services/sidebar.service';
import { Title } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  isDarkTheme = false;
  title = 'ONIX Web client';

  constructor(private router: Router,
    public sidebar: SidebarService,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle( this.title );

    this.router.navigateByUrl('/barcode')
  }

  toggleSidenav() {
    this.sidebar.toggle();
  }

}
