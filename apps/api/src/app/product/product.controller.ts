import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductPostDto } from './dto/product.post.dto';
import { ProductPutDto } from './dto/product.put.dto';
import { ProductEntity } from '../entities/product.entity';
import { User } from '../shared/user.decorator';
import { UserEntity } from '../entities/user.entity';
import { Product } from '@homeboi/api-interfaces';

@Controller('products')
export class ProductController {

  constructor(private readonly productService: ProductService) {
  }

  @Get('')
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get('foruser')
  async getAllProductsForUser(@User() user: UserEntity): Promise<Product[]> {
    return this.productService.getAllProductsForUser(user);
  }

  @Get(':id')
  async getProductById(@Param('id') productId: string): Promise<Product> {
    return this.productService.getProductById(productId);
  }

  @Post()
  async createProduct(@Body() product: ProductPostDto, @User() user: UserEntity): Promise<ProductEntity> {
    return this.productService.createProduct(product, user.userId);
  }

  @Put()
  async updateProduct(@Body() product: ProductPutDto, @User() user: UserEntity): Promise<ProductEntity> {
    return this.productService.updateProduct(product, user.userId);
  }

  @Delete(':productId')
  async deleteProduct(@Param('productId') productId: string): Promise<void> {
    const deleted = await this.productService.deleteProduct(productId);
    if (!deleted) {
      throw new NotFoundException();
    }
  }

}
