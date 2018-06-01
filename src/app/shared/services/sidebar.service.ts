import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs';

@Injectable()
export class SidebarService {

  private open = false;
  private toggleSource = new Subject<boolean>();
  toggleMenu = this.toggleSource.asObservable();

  toggle() {
    this.open = !this.open;
    this.toggleSource.next(this.open);
  }

  close() {
    this.open = false;
    this.toggleSource.next(this.open);
  }
}
