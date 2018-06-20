import { Injectable } from '@angular/core';
import { SidenavItem } from 'app/models/sidenav-item';
import { AuthenticationStoreService } from 'app/services/auth/auth-store.service';

@Injectable()
export class SidebarMappingService {

  constructor(private tokenStore: AuthenticationStoreService) { }

  public getSidenavItems(isAuthenticated: boolean): SidenavItem[] {
    if (!isAuthenticated) {
      return this.getItemsNotAuth();
    } else {
      const role = this.tokenStore.getToken().user.role.toLocaleLowerCase(); // TODO pass here user from server response
      return this.getItemsForRole(role);
    }
  }

  getItemsForRole(role: string): SidenavItem[] {

    let items = [
      new SidenavItem({routerLink: '', caption: 'Zalogowano: ' + role}),
    ];

    if (['user', 'admin', 'dev'].indexOf(role) !== -1) {
      items.push(new SidenavItem({routerLink: '/completation', caption: 'Kompletacja'}));
    }

    if (['admin', 'dev'].indexOf(role) !== -1) {
      items.push(new SidenavItem({routerLink: '/users/all', caption: 'Użytkownicy'}));
    }

    if (role === 'dev') {
      const develSidenavItems = [
        new SidenavItem({routerLink: '/touch', caption: 'SWIPE DEMO'}),
        new SidenavItem({routerLink: '/barcode', caption: 'CZYTNIK KODÓW'}),
        new SidenavItem({routerLink: '/users/all', caption: 'Użytkownicy'}),
        new SidenavItem({routerLink: '/messages', caption: 'wiadomości ( 0 )'}),
      ]
      items = items.concat(develSidenavItems);
    }
    items.push(new SidenavItem({routerLink: '/logout', caption: 'Wyloguj', icon: 'account_circle'}));

    return items;
  }

  getItemsNotAuth(): SidenavItem[] {
    return [
      new SidenavItem({routerLink: '/login', caption: 'Login', icon: 'account_circle'}),
    ];
  }

}
