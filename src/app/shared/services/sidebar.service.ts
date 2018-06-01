import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { SidenavItem } from '../../models/sidenav-item';

@Injectable()
export class SidebarService {

  private open = false;
  private toggleSource = new Subject<boolean>();
  toggleMenu$ = this.toggleSource.asObservable();
  items$: Observable<SidenavItem[]>;


  constructor() {
    this.items$ = of([
      new SidenavItem({routerLink: '', caption: 'STRONA GŁÓWNA'}),
      new SidenavItem({routerLink: '/users/all', caption: 'ZAMÓWIENIA'}),
      new SidenavItem({routerLink: '/users/touch', caption: 'SWIPE DEMO'}),
      new SidenavItem({routerLink: '/barcode', caption: 'CZYTNIK KODÓW'}),
      new SidenavItem({routerLink: '/users/messages', caption: 'wiadomości ( 0 )'}),
      new SidenavItem({routerLink: '', caption: 'Ustawienia', icon: 'account_circle'}),
    ]);
  }

  toggle() {
    this.open = !this.open;
    this.toggleSource.next(this.open);
  }

  close() {
    this.open = false;
    this.toggleSource.next(this.open);
  }
}
