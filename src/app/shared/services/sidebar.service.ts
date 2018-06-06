import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

import { SidenavItem } from 'app/models/sidenav-item';
import { AuthenticationService } from 'app/services/auth/auth.service';

@Injectable()
export class SidebarService {

  private open: boolean;
  private toggleSource$: Subject<boolean>;
  private itemsSource$: Subject<SidenavItem[]>;
  public toggleMenu$: Observable<boolean>;
  public items$: Observable<SidenavItem[]>;


  constructor(
    // auth: AuthenticationService
  ) {
    this.open = true;
    this.toggleSource$ = new Subject<boolean>();
    this.toggleMenu$ = this.toggleSource$.asObservable();
    this.itemsSource$ = new Subject<SidenavItem[]>();

    // auth.isAuthenticated$.subscribe(isAuthenticated => this.onAuthChange(isAuthenticated)); // yy todo

    this.items$ = of([
      new SidenavItem({routerLink: '', caption: 'STRONA GŁÓWNA'}),
      new SidenavItem({routerLink: '/', caption: 'STRONA GŁÓWNA/'}),
      new SidenavItem({routerLink: '/users/all', caption: 'ZAMÓWIENIA'}),
      new SidenavItem({routerLink: '/users/touch', caption: 'SWIPE DEMO'}),
      new SidenavItem({routerLink: '/barcode', caption: 'CZYTNIK KODÓW'}),
      new SidenavItem({routerLink: '/users/messages', caption: 'wiadomości ( 0 )'}),
      new SidenavItem({routerLink: '/login', caption: 'Login', icon: 'account_circle'}),
    ]);
  }

  onAuthChange(isAuthenticated: boolean) {
    if (isAuthenticated) {
      //
    }
  }

  toggle() {
    this.open = !this.open;
    this.toggleSource$.next(this.open);
  }

  close() {
    this.open = false;
    this.toggleSource$.next(this.open);
  }
}
