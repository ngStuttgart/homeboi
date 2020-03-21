import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductPostDto } from './dto/product.post.dto';
import { ProductPutDto } from './dto/product.put.dto';
import { TagService } from '../tag/tag.service';
import { TagEntity } from '../entities/tag.entity';
import { UserEntity } from '../entities/user.entity';
import { Product } from '@homeboi/api-interfaces';

@Injectable()
export class ProductService {
  constructor(private tagService: TagService) {
  }

  async getAllProducts(): Promise<Product[]> {
    return this.mapToProduct(await getRepository(ProductEntity).find({
      where: { available: true },
      relations: ['tags']
    })) || [];
  }

  async getAllProductsForUser(user: UserEntity): Promise<Product[]> {
    return this.mapToProduct(await getRepository(ProductEntity).find({ where: { user }, relations: ['tags'] }));
  }

  async getProductById(productId): Promise<ProductEntity> {
    return await getRepository(ProductEntity).findOne(productId);
  }

  async createProduct(productDto: ProductPostDto, userId: string): Promise<ProductEntity> {
    if (productDto) {
      const product = new ProductEntity();
      product.productType = productDto.productType;
      product.user = userId as any;
      product.description = productDto.description;
      product.title = productDto.title;
      product.tags = await this.saveAndUpdateTags(productDto.tags);
      product.width = productDto.width;
      product.height = productDto.height;
      product.depth = productDto.depth;
      product.price = productDto.price;
      product.paymentDuration = productDto.paymentDuration;
      product.image = productDto.image;

      return getRepository(ProductEntity).save(product);
    } else {
      throw new BadRequestException();
    }
  }

  async updateProduct(productDto: ProductPutDto, userId: string): Promise<ProductEntity> {
    const product = await getRepository(ProductEntity).findOne({ id: productDto.id });
    if (product) {
      product.productType = productDto.productType;
      product.user = userId as any;
      product.description = productDto.description;
      product.title = productDto.title;
      product.tags = await this.saveAndUpdateTags(productDto.tags);
      product.width = productDto.width;
      product.height = productDto.height;
      product.depth = productDto.depth;
      product.price = productDto.price;
      product.paymentDuration = productDto.paymentDuration;
      product.image = productDto.image;

      return getRepository(ProductEntity).save(product);
    } else {
      throw new NotFoundException();
    }
  }

  async deleteProduct(productId: string): Promise<boolean> {
    return (await getRepository(ProductEntity).delete({ id: productId })).affected === 1;
  }

  private async saveAndUpdateTags(newTags: string[]): Promise<TagEntity[]> {
    let tags = [];
    for (const tag of newTags) {
      const existingTag = await this.tagService.getTagByValue(tag);
      if (existingTag) {
        tags = [...tags, existingTag];
      } else {
        tags = [...tags, await this.tagService.createTag({ value: tag })];
      }
    }
    return tags;
  }

  private mapToProduct(productEntity: ProductEntity[]): Product[] {
    return productEntity.map(product => ({
      ...product,
      tags: product.tags.map(tag => tag.value)
    }));
  }

}
