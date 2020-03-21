import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentDurationPipe } from '@homeboi/shared/payment-duration-pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [PaymentDurationPipe],
  exports: [PaymentDurationPipe]
})
export class PaymentDurationModule {}
