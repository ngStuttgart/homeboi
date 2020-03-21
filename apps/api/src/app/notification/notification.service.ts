import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { NotificationEntity } from '../entities/notification.entity';

@Injectable()
export class NotificationService {
  public async getAllNotifications() {
    return await getRepository(NotificationEntity).find();
  }

  public async deleteNotification(notificationId: string) {
    return await getRepository(NotificationEntity).delete(notificationId);
  }

  public async getAllNotificationsByUser(userId: string): Promise<Array<NotificationEntity>> {
    return await getRepository(NotificationEntity).find({
      where: {
        user: userId
      }
    });
  }
}
