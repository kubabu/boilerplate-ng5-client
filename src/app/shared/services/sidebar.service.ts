import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

import { SidenavItem } from 'app/models/sidenav-item';
import { AuthenticationService } from 'app/services/auth/authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SidebarMappingService } from 'app/shared/services/sidebar-mapping.service';

@Injectable()
export class SidebarService {

  private _opened: boolean;
  private toggleSource$: Subject<boolean>;
  private itemsSource$: Subject<SidenavItem[]>;
  public toggleMenu$: Observable<boolean>;
  public items$: Observable<SidenavItem[]>;


  constructor(
    private authSvc: AuthenticationService,
    private mappingService: SidebarMappingService,
  ) {
    this._opened = false;
    this.toggleSource$ = new BehaviorSubject<boolean>(this._opened);
    this.toggleMenu$ = this.toggleSource$.asObservable();

    this.itemsSource$ = new BehaviorSubject<SidenavItem[]>(this.mappingService.getSidenavItems(false));
    this.items$ = this.itemsSource$.asObservable();

    this.authSvc.isAuthenticated$
      .subscribe(isAuthenticated => this.onAuthChange(isAuthenticated));
  }

  onAuthChange(isAuthenticated: boolean) {
    this.close();
    this.itemsSource$.next(this.mappingService.getSidenavItems(isAuthenticated));
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
}
