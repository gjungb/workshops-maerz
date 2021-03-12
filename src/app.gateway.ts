import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import WebSocket from 'ws';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection {
  handleConnection(client: WebSocket, ...args: any[]) {
    client.send('connected');
  }
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string): string {
    return `Hallo ${data}`;
  }
}
