import { Module } from '@nestjs/common';
import { TagsController } from './product.controller';
import { TagsService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
  ],
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagModule {
}
