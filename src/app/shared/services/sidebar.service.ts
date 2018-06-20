import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

import { SidenavItem } from 'app/models/sidenav-item';
import { AuthenticationService } from 'app/services/auth/auth.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SidebarService {

  private _opened: boolean;
  private toggleSource$: Subject<boolean>;
  private itemsSource$: Subject<SidenavItem[]>;
  public toggleMenu$: Observable<boolean>;
  public items$: Observable<SidenavItem[]>;


  constructor(
    private authSvc: AuthenticationService,
  ) {
    this._opened = false;
    this.toggleSource$ = new BehaviorSubject<boolean>(this._opened);
    this.toggleMenu$ = this.toggleSource$.asObservable();

    this.itemsSource$ = new BehaviorSubject<SidenavItem[]>(this.getItemsNotAuth());
    this.items$ = this.itemsSource$.asObservable();

    this.authSvc.isAuthenticated$
      .subscribe(isAuthenticated => this.onAuthChange(isAuthenticated));
  }

  onAuthChange(isAuthenticated: boolean) {
    this.close();
    if (isAuthenticated) {
      this.itemsSource$.next(this.getItems('dev')); // gTODO pass here user from server response
    } else {
      this.itemsSource$.next(this.getItemsNotAuth());
    }
  }

  toggle() {
    this._opened = !this._opened;
    this.toggleSource$.next(this._opened);
  }

  close() {
    this._opened = false;
    this.toggleSource$.next(this._opened);
  }

  open() {
    this._opened = true;
    this.toggleSource$.next(this._opened);
  }


  getItems(role: string): SidenavItem[] {
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
