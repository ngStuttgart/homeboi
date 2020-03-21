import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Notification, NotificationType } from '@homeboi/api-interfaces';
import { UserEntity } from './user.entity';

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
  @ManyToOne(type => UserEntity, type => type.notifications)
  user: UserEntity;
}
