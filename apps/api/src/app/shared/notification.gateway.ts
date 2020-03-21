import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Notification } from '@homeboi/api-interfaces';
import { NotificationEntity } from '../entities/notification.entity';
import { getRepository } from 'typeorm';

@WebSocketGateway({ transports: ['websocket'] })
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  public async sendNotification(userId: string, notification: Notification) {
    const notificationRepository = getRepository(NotificationEntity);
    const notificationEntity = new NotificationEntity();
    notificationEntity.date = new Date();
    notificationEntity.message = notification.message;
    notificationEntity.type = notification.type;
    notificationEntity.user = userId as any;
    await notificationRepository.save(notificationEntity);
    this.server.emit(userId, notification);
  }
}
