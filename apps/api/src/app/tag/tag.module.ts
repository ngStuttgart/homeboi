import { Global, Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Global()
@Module({
  imports: [],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService]
})
export class TagModule {
}
