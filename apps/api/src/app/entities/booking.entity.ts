import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { Booking } from '@homeboi/api-interfaces';
import { ProductEntity } from './product.entity';
import { RatingEntity } from './rating.entity';

@Entity()
export class BookingEntity implements Omit<Booking, 'product'> {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  start: Date;

  @Column({ type: 'date', nullable: true })
  end: Date;

  @Column({ default: false })
  returned: boolean;

  @ManyToOne(type => ProductEntity, type => type.bookings)
  product: ProductEntity;

  @ManyToOne(type => UserEntity, type => type.bookings)
  user: UserEntity;

  @OneToOne(type => RatingEntity, type => type.booking, { nullable: true })
  @JoinColumn()
  rating: RatingEntity;
}
