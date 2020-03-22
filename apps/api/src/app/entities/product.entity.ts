import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentDuration, ProductType } from '@homeboi/api-interfaces';
import { TagEntity } from './tag.entity';
import { BookingEntity } from './booking.entity';
import { UserEntity } from './user.entity';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'enum', enum: ProductType, default: ProductType.SONSTIGES })
  productType: ProductType;
  @ManyToOne(type => UserEntity, { eager: true })
  user: UserEntity;
  @Column({ nullable: true })
  description: string;
  @Column()
  title: string;
  @ManyToMany(type => TagEntity, type => type.products, { nullable: true })
  @JoinTable()
  tags: Array<TagEntity>;
  @Column({ nullable: true })
  width: number;
  @Column({ nullable: true })
  height: number;
  @Column({ nullable: true })
  depth: number;
  @Column('float')
  price: number;
  @Column({ default: true })
  available: boolean;
  @Column({ type: 'enum', enum: PaymentDuration, default: PaymentDuration.WEEKLY })
  paymentDuration: PaymentDuration;
  @Column({ nullable: true })
  image: string;
  @OneToMany(type => BookingEntity, type => type.product)
  bookings: Array<BookingEntity>;
}
