import { Component, OnInit } from '@angular/core';
import { MessageService } from './../../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {

  public messages: string[];

  constructor(public messageService: MessageService) { }

  ngOnInit() {
    this.messages = this.messageService.messages;
  }

  public clearMessages(): void {
    this.messageService.clear();
    this.messages = this.messageService.messages; // it would be better to replace it with observable
  }

}
