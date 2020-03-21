import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ProductEntity } from './product.entity';
import { RatingValue } from '@homeboi/api-interfaces';
import { UserEntity } from './user.entity';

@Entity()
@Unique(['value'])
export class RatingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'enum', enum: RatingValue })
  value: RatingValue;
  @ManyToMany(type => ProductEntity, type => type.tags)
  products: Array<ProductEntity>;
  @Column()
  description: string;
  @CreateDateColumn()
  date: Date;
  @ManyToOne(type => UserEntity, type => type.ratings)
  user: UserEntity;
}
