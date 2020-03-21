import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique
} from 'typeorm';
import { AccountType, Signup } from '@homeboi/api-interfaces';
import { AddressEntity } from './address.entity';
import { BookingEntity } from './booking.entity';
import { RatingEntity } from './rating.entity';

@Entity()
@Unique(['email'])
export class UserEntity implements Omit<Signup, 'accountType'> {
  @PrimaryGeneratedColumn('uuid')
  userId: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ enum: [AccountType.COMPANY, AccountType.USER] })
  accountType: string;
  @Column()
  name: string;
  @OneToOne(() => AddressEntity)
  @JoinColumn()
  address: AddressEntity;
  @Column({ nullable: true })
  contactPerson: string | null;
  @OneToMany(type => BookingEntity, type => type.user)
  bookings: Array<BookingEntity>;
  @OneToMany(type => RatingEntity, type => type.user)
  ratings: Array<RatingEntity>;
}
