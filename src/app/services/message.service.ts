import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MessageService {
  private messages: string[];
  private messagesSubject$: Subject<string[]>;
  private messageCountSubject$: Subject<number>;

  public messages$: Observable<string[]>;
  public count$: Observable<number>;


  constructor() {
    this.messages  = [];
    this.messagesSubject$ = new BehaviorSubject<string[]>(this.messages);
    this.messages$ = this.messagesSubject$.asObservable();
    this.messageCountSubject$ = new BehaviorSubject<number>(this.messages.length);
    this.count$ = this.messageCountSubject$.asObservable();
  }

  add(message: string) {
    this.messages.push(message);
    this.updateObservables();
  }

  clear() {
    this.messages = [];
    this.updateObservables();
  }

  private updateObservables() {
    this.messageCountSubject$.next(this.messages.length);
    this.messagesSubject$.next(this.messages);
  }
}
