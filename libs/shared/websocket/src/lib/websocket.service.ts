import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private socket!: WebSocket;
  public messageReceived = new Subject<string>();

  public connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.onopen = (): void => {
      console.log('socket onopen');
    };

    this.socket.onmessage = ({ data: message }): void => {
      console.log('message: ', message);
      this.messageReceived.next(message);
    };

    this.socket.onclose = (event): void => {
      console.log('socket onclose:', event);
    };

    this.socket.onerror = (error): void => {
      console.error('socket onerror:', error);
    };
  }

  public sendMessage(message: string): void {
    this.socket.send(message);
  }

  public closeConnection(): void {
    this.socket.close();
  }
}
