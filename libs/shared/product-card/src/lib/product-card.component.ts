import { Component, Input } from '@angular/core';
import { Product } from '@homeboi/api-interfaces';

@Component({
  selector: 'homeboi-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: Product;
}
