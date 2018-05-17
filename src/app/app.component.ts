import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from './services/sidebar.service';
import { Title } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  isDarkTheme = false;
  title = 'ONIX Web client';
  @ViewChild('sidenav') sidenav: MatSidenav

  constructor(private router: Router,
    private sidebar: SidebarService,
    private titleService: Title) {}

  ngOnInit() {
    this.router.navigateByUrl('/barcode')
    this.titleService.setTitle( this.title );
    this.sidebar.toggleMenu.subscribe(() => {
      this.sidenav.toggle()
    });
  }

  toggleSidenav() {
    this.sidebar.toggle();
  }

}
