import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Notification, NotificationType } from '@homeboi/api-interfaces';

@Entity()
export class NotificationEntity implements Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ enum: NotificationType, type: 'enum' })
  type: NotificationType;
  @Column()
  message: string;
  @CreateDateColumn()
  date: Date;
}
