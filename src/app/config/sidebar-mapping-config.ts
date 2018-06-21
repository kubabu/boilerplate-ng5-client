import { Injectable } from '@angular/core';
import { SidenavItem } from 'app/models/sidenav-item';

@Injectable()
export class SidebarMappingConfiguration {
  public unauthorizedSidenavItems =  [
    new SidenavItem({routerLink: '/login', caption: 'Login', icon: 'account_circle'}),
  ];


  public userSidenavItems = [
    new SidenavItem({routerLink: '/completation', caption: 'Kompletacja'}),
  ];

  public adminSidenavItems = [
    new SidenavItem({routerLink: '/users/all', caption: 'Użytkownicy'}),
  ];

  public develSidenavItems = [
    new SidenavItem({routerLink: '/touch', caption: 'SWIPE DEMO'}),
    new SidenavItem({routerLink: '/barcode', caption: 'CZYTNIK KODÓW'}),
    new SidenavItem({routerLink: '/users/all', caption: 'Użytkownicy'}),
    new SidenavItem({routerLink: '/messages', caption: 'wiadomości ( 0 )'}),
  ];

  public authorizedSidenavItemsEnd = [
    new SidenavItem({routerLink: '/logout', caption: 'Wyloguj', icon: 'account_circle'}),
  ];
}
