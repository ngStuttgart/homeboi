import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity()
@Unique(['value'])
export class TagEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  value: string;
  @ManyToMany(type => ProductEntity, type => type.tags)
  products: Array<ProductEntity>;
}
