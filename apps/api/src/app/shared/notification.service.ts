import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Notification } from '@homeboi/api-interfaces';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({ transports: ['websocket'] })
@Injectable()
export class NotificationService {
  @WebSocketServer()
  server: Server;

  public sendNotification(userId: string, notification: Notification) {
    this.server.emit(userId, notification);
  }
}
