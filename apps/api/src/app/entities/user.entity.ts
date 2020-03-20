import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountType, Signup } from '@homeboi/api-interfaces';
import { AddressEntity } from './address.entity';

@Entity()
export class UserEntity implements Omit<Signup, 'accountType'> {

  @PrimaryGeneratedColumn('uuid')
  email: string;

  @Column()
  password: string;

  @Column({enum: [AccountType.COMPANY, AccountType.USER]})
  accountType: string;

  @Column()
  name: string;

  @OneToOne(() => AddressEntity)
  @JoinColumn()
  address: AddressEntity;

  @Column({nullable: true})
  contactPerson: string | null;
}
