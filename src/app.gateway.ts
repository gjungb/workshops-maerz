import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import WebSocket from 'ws';
import { AppService } from './app.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection {
  constructor(private readonly app: AppService) {}

  handleConnection(client: WebSocket, ...args: any[]) {
    client.send(JSON.stringify({ event: 'connected', data: true }));
  }

  /**
   * Handle data sent to the 'ping' channel
   * @param data Some arbitrary number for demonstration purposes only
   * @returns A 'pong' event that informs the client whether the given data is divisible by 2
   */
  @SubscribeMessage('ping')
  handlePing(@MessageBody() data: number): WsResponse<boolean> {
    return { event: 'pong', data: !!(data % 2) };
  }

  /**
   * Handle data sent to the 'message' channel
   * @param data Some arbitrary number for demonstration purposes only
   * @returns An RxJS Observable that informs the client whenever a message has been passed to the @see AppService
   */
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: number): Observable<WsResponse<string>> {
    console.log(data);
    return this.app.message$.pipe(
      map((message) => ({ event: 'message', data: message })),
    );
  }
}
