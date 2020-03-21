import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { Booking } from '@homeboi/api-interfaces';
import { ProductEntity } from './product.entity';

@Entity()
export class BookingEntity implements Booking {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  start: Date;

  @Column({ type: 'date' })
  end: Date;

  @ManyToOne(type => ProductEntity, type => type.bookings)
  product: ProductEntity;

  @ManyToOne(type => UserEntity, type => type.bookings)
  user: UserEntity;
}
