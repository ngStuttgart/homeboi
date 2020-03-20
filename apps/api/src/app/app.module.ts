import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomHttpFilter, joinPathFactory } from './filter/custom-http.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { UserEntity } from './entities/user.entity';
import { AddressEntity } from './entities/address.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      ssl: true,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [UserEntity, AddressEntity],
      synchronize: true
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    joinPathFactory,
    CustomHttpFilter
  ]
})
export class AppModule {
  constructor() {
    console.log(join(__dirname, '../../../**/*.entity{.ts,.js}'));
  }

}
