import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class AppGateway {
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: string): string {
    return `Hallo ${data}`;
  }
}
