import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  scoket: any;
  readonly uri: string = 'ws://localhost:3000';

  constructor() {
    this.scoket = io(this.uri);
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.scoket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.scoket.emit(eventName, data);
  }
}
