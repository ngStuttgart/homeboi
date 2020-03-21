import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RatingValue } from '@homeboi/api-interfaces';
import { UserEntity } from './user.entity';
import { BookingEntity } from './booking.entity';

@Entity()
export class RatingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'enum', enum: RatingValue })
  value: RatingValue;
  @OneToOne(type => BookingEntity, type => type.rating)
  booking: BookingEntity;
  @Column()
  description: string;
  @CreateDateColumn()
  date: Date;
  @ManyToOne(type => UserEntity, type => type.ratings)
  user: UserEntity;
}
