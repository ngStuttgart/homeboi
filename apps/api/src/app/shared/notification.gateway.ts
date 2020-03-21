import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Notification } from '@homeboi/api-interfaces';

@WebSocketGateway({ transports: ['websocket'] })
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  public sendNotification(userId: string, notification: Notification) {
    this.server.emit(userId, notification);
  }
}
