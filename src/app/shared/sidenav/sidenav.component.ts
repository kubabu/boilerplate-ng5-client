import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styles: [],

})
export class SidenavComponent implements OnInit {
  private @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(public sidebar: SidebarService) { }

  ngOnInit(): void {
    this.sidebar.toggleMenu.subscribe(() => {
      this.sidenav.toggle()
    });
  }

  toggleMenu() {
    this.sidebar.toggle();
  }
}
