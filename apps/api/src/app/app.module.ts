import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomHttpFilter, joinPathFactory } from './filter/custom-http.filter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './entities/user.entity';
import { AddressEntity } from './entities/address.entity';
import { BookingEntity } from './entities/booking.entity';
import { NotificationEntity } from './entities/notification.entity';
import { ProductEntity } from './entities/product.entity';
import { RatingEntity } from './entities/rating.entity';
import { TagEntity } from './entities/tag.entity';
import { ProductModule } from './product/product.module';
import { TagModule } from './tag/tag.module';
import { BookingModule } from './bookings/booking.module';
import { NotificationGatewayModule } from './shared/notificationGatewayModule';
import { NotificationModule } from './notification/notification.module';

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
      entities: [UserEntity, AddressEntity, BookingEntity, NotificationEntity, ProductEntity, RatingEntity, TagEntity],
      synchronize: true
    }),
    UserModule,
    ProductModule,
    TagModule,
    BookingModule,
    NotificationGatewayModule,
    NotificationModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    joinPathFactory,
    CustomHttpFilter
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
  }
}
