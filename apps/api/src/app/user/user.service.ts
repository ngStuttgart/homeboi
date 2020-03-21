import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserPostDto } from './dto/user.post.dto';
import { AddressEntity } from '../entities/address.entity';
import { EntityManager, getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

  constructor() {
  }

  async login(email: string, password: string) {
    const userRepository = getRepository(UserEntity);
    const user = await userRepository.findOne({
      where: {
        email
      }
    });
    if (user) {
      return await userRepository.findOne({
        where: {
          email,
          password
        },
        relations: ['address']
      });
    } else {
      throw new UnauthorizedException();
    }
  }

  public async signup(userDto: UserPostDto) {
    const userRepository = getRepository(UserEntity);
    const addressRepository = getRepository(AddressEntity);
    const user = new UserEntity();
    user.accountType = userDto.accountType;
    const address = new AddressEntity();
    address.city = userDto.address.city;
    address.country = userDto.address.country;
    address.street = userDto.address.street;
    address.zipCode = userDto.address.zipCode;
    address.streetNumber = userDto.address.streetNumber;
    user.address = await addressRepository.save(address);
    user.contactPerson = userDto.contactPerson;
    user.email = userDto.email;
    user.password = userDto.password;
    user.name = userDto.name;
    return userRepository.save(user);
  }
}
