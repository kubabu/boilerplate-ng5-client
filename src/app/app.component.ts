import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SidenavItem } from './models/sidenav-item';
import { SidebarService } from './services/sidebar.service';
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
  @ViewChild('sidenav') sidenav: MatSidenav

  sidenavItems$: Observable<SidenavItem[]>;

  constructor(private router: Router,
    private sidebar: SidebarService,
    private titleService: Title) {
      this.sidenavItems$ = of([
        new SidenavItem({routerLink: '', caption: 'STRONA GŁÓWNA'}),
        new SidenavItem({routerLink: '/users/all', caption: 'ZAMÓWIENIA'}),
        new SidenavItem({routerLink: '/users/touch', caption: 'SWIPE DEMO'}),
        new SidenavItem({routerLink: '/barcode', caption: 'CZYTNIK KODÓW'}),
        new SidenavItem({routerLink: '/users/messages', caption: 'wiadomości ( 0 )'}),
        new SidenavItem({routerLink: '', caption: 'Ustawienia', icon: 'account_circle'}),
      ]);
    }

  ngOnInit() {
    this.titleService.setTitle( this.title );
    this.sidebar.toggleMenu.subscribe(() => {
      this.sidenav.toggle()
    });

    this.router.navigateByUrl('/barcode')
  }

  toggleSidenav() {
    this.sidebar.toggle();
  }

}
