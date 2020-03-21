import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [CommonModule, MatCardModule],
  exports: [ProductCardComponent],
  declarations: [ProductCardComponent]
})
export class SharedProductCardModule {}
