import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    const newProduct = this.productRepository.create(dto);
    return this.productRepository.save(newProduct);
  }

  async update(dto: CreateProductDto): Promise<ProductEntity> {
    return this.productRepository.save(dto);
  }

  async remove(id: string): Promise<{ message: string }> {
    const res = await this.productRepository.delete(id);
    if (res.affected === 0) {
      throw new Error('Cannot found !');
    }

    return { message: 'Successful delete' };
  }
}
