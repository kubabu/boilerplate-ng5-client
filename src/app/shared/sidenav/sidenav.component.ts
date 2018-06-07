import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarService } from 'app/shared/services/sidebar.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styles: [],
})

export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(public sidebarSvc: SidebarService) { }

  ngOnInit(): void {
    this.sidebarSvc.toggleMenu$.subscribe(open => {
      if (open) {
        this.open();
      } else {
        this.close();
      }
    });
  }

  open() {
    this.sidenav.open();
  }

  close() {
    this.sidenav.close();
  }

  toggle() {
    this.sidebarSvc.toggle();
  }
}
