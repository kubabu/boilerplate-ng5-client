import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  isDarkTheme = false;
  title = 'ONIX Web';

  constructor(private router: Router, public sidebar: SidebarService) {}

  ngOnInit() {
    this.router.navigateByUrl('/barcode')
  }

}
