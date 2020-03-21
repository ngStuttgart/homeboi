import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { MatCardModule } from '@angular/material/card';
import { PaymentDurationModule } from '@homeboi/shared/payment-duration-pipe';

@NgModule({
  imports: [CommonModule, MatCardModule, PaymentDurationModule],
  exports: [ProductCardComponent],
  declarations: [ProductCardComponent]
})
export class SharedProductCardModule {}
