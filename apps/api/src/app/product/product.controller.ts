import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

  constructor(private readonly productService: ProductService) {}

  @Get('')
  getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  getProductById(@Param('id') productId: string) {
    return this.productService.getProductById(productId);
  }


}
