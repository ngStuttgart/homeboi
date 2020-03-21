import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductPostDto } from './dto/product.post.dto';
import { ProductPutDto } from './dto/product.put.dto';
import { ProductEntity } from '../entities/product.entity';

@Controller('products')
export class ProductController {

  constructor(private readonly productService: ProductService) {
  }

  @Get('')
  async getAllProducts(): Promise<ProductEntity[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') productId: string): Promise<ProductEntity> {
    return this.productService.getProductById(productId);
  }

  @Post()
  async createProduct(@Body() product: ProductPostDto): Promise<ProductEntity> {
    return this.productService.createProduct(product);
  }

  @Put()
  async updateProduct(@Body() product: ProductPutDto): Promise<ProductEntity> {
    return this.productService.updateProduct(product);
  }

  @Delete(':productId')
  async deleteProduct(@Param('productId') productId: string): Promise<void> {
    const deleted = await this.productService.deleteProduct(productId);
    if (!deleted) {
      throw new NotFoundException();
    }
  }

}
