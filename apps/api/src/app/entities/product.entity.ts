import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentDuration, ProductType } from '../../../../../libs/api-interfaces/src/lib/product';
import { TagEntity } from './tag.entity';
import { BookingEntity } from './booking.entity';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'enum', enum: ProductType, default: ProductType.SONSTIGES })
  productType: ProductType;
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
  @Column()
  price: number;
  @Column({ type: 'enum', enum: PaymentDuration, default: PaymentDuration.WEEKLY })
  paymentDuration: PaymentDuration;
  @Column({ nullable: true })
  image: string;
  @OneToMany(type => BookingEntity, type => type.product)
  bookings: Array<BookingEntity>;
}
