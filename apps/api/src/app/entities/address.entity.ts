import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class AddressEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity)
  user: UserEntity;

  @Column()
  city: string;

  @Column()
  zipCode: string;

  @Column()
  street: string;

  @Column()
  streetNumber: string;

  @Column()
  country: string;
}
