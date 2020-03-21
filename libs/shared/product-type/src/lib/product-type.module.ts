import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductTypePipe } from './product-type.pipe';

@NgModule({
  imports: [CommonModule],
  exports: [
    ProductTypePipe
  ],
  declarations: [ProductTypePipe]
})
export class ProductTypeModule {}
