import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from './services/sidebar.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  isDarkTheme = false;
  title = 'ONIX Web client';

  constructor(private router: Router,
    public sidebar: SidebarService,
    private titleService: Title) {}

  ngOnInit() {
    this.router.navigateByUrl('/barcode')
    this.titleService.setTitle( this.title );
  }

}
