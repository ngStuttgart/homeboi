import { Controller, Delete, Get, Param } from '@nestjs/common';
import { NotificationEntity } from '../entities/notification.entity';
import { NotificationService } from './notification.service';
import { User } from '../shared/user.decorator';
import { UserEntity } from '../entities/user.entity';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {
  }

  @Get('')
  async getAllNotifications(): Promise<Array<NotificationEntity>> {
    return await this.notificationService.getAllNotifications();
  }

  @Get('user')
  async getAllNotificationsForUser(@User() user: UserEntity): Promise<Array<NotificationEntity>> {
    return await this.notificationService.getAllNotificationsByUser(user.userId);
  }

  @Delete(':id')
  async deleteNotification(@Param('id') notificationId: string, @User() user: UserEntity): Promise<Array<NotificationEntity>> {
    await this.notificationService.deleteNotification(notificationId);
    return await this.notificationService.getAllNotificationsByUser(user.userId);
  }
}
