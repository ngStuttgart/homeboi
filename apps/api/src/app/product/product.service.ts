import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';

@Injectable()
export class ProductService {

  constructor() {
  }

  async getAllProducts() {
    const productRepository = getRepository(ProductEntity);
    return await productRepository.find()
  }

  async getProductById(productId) {
    const productRepository = getRepository(ProductEntity);
    return await productRepository.find({
      where: {
        id: productId
      }
    });
  }

}
