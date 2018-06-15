import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { AuthenticationService } from 'app/services/auth/auth.service';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { SidebarService } from 'app/shared/services/sidebar.service';
import { Subject } from 'rxjs/Subject';
import { CompilePipeMetadata } from '@angular/compiler';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  isDarkTheme = false;
  title = 'ONIX Web client';

  private _hubConnection: HubConnection;
  private _connectionEstablished: Subject<boolean>;

  constructor(
    private auth: AuthenticationService,
    public sidebar: SidebarService,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle( this.title );

    this.auth.handleAuthentication();

    this._connectionEstablished = new Subject<boolean>();
    const hubUrl = 'https://localhost:5000/Hubs/Values';
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .build();

    this._hubConnection.start()
      .then(() => {
        this._connectionEstablished.next(true);
      })
      .catch(err => {
        console.log('Error while connecting to hub :', err )
      });

    this._hubConnection.on('Add', (data: any) => {
      this.onAdd(data);
    });

    this._hubConnection.on('Deleted', (data: any) => {
      this.onDelete(data);
    });
  }

  onDelete(data: any) {
    console.log(data);
  }

  onAdd(data: any) {
    console.log(data);
  }
}
