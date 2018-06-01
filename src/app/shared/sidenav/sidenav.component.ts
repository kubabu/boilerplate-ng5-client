import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarService } from '../../shared/services/sidebar.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styles: [],
})

export class SidenavComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(public sidebar: SidebarService) { }

  ngOnInit(): void {
    this.sidebar.toggleMenu$.subscribe(() => {
      this.sidenav.toggle()
    });
  }

  toggle() {
    this.sidebar.toggle();
  }
}
