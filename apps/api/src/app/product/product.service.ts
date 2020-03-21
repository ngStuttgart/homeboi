import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductPostDto } from './dto/product.post.dto';
import { ProductPutDto } from './dto/product.put.dto';
import { TagService } from '../tag/tag.service';
import { TagEntity } from '../entities/tag.entity';

@Injectable()
export class ProductService {
  constructor(private tagService: TagService) {
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    return await getRepository(ProductEntity).find() || [];
  }

  async getProductById(productId): Promise<ProductEntity> {
    return await getRepository(ProductEntity).findOne(productId);
  }

  async createProduct(productDto: ProductPostDto): Promise<ProductEntity> {
    if (productDto) {
      const product = new ProductEntity();
      product.productType = productDto.productType;
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

  async updateProduct(productDto: ProductPutDto): Promise<ProductEntity> {
    const product = await getRepository(ProductEntity).findOne({ id: productDto.id });
    if (product) {
      product.productType = productDto.productType;
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

}
