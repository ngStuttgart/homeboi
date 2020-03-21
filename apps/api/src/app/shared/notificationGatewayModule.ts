import { Global, Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
@Module({
  providers: [NotificationGateway],
  exports: [NotificationGateway]
})
@Global()
export class NotificationGatewayModule{}
