import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import WebSocket from 'ws';
import { AppService } from './app.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection {
  constructor(private readonly app: AppService) {}

  handleConnection(client: WebSocket, ...args: any[]) {
    client.send('connected');
  }
  @SubscribeMessage('message')
  handleMessage(): Observable<string> {
    return this.app.message$;
  }
}
