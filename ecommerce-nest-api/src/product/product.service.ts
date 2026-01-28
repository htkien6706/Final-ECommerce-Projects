import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { DataSource } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    const newProduct = this.productRepository.create(dto);
    return this.productRepository.save(newProduct);
  }

  async remove(id: string): Promise<{ message: string }> {
    const res = await this.productRepository.delete({ uniqueId: id });
    if (res.affected === 0) {
      throw new Error('Cannot found !');
    }

    return { message: 'Successful delete' };
  }

  //i think i better using queryBuilder to query, not using the Repository API anymore haizz
  async updateById(
    dto: CreateProductDto,
  ): Promise<{ message: string; state: boolean }> {
    const queryResult = await this.dataSource
      .createQueryBuilder()
      .update(ProductEntity)
      .set({
        product_description: dto.product_description,
        preview_image: dto.preview_image,
        detailed_description: dto.detailed_description,
        original_price: dto.original_price,
        discount_price: dto.discount_price,
        total_buyer: dto.total_buyer,
        rating: dto.rating,
        product_images: dto.product_images,
      })
      .where('uniqueId = :uniqueId', { uniqueId: dto.uniqueId })
      .execute();

    if (queryResult.affected === 0) {
      console.log('There is no column to update!');
      return {
        message: 'No matching column to update',
        state: false,
      };
    }

    return {
      message: 'UPDATE QUERY SUCCESSFUL, DATA WILL BE RETURNED !',
      state: true,
    };
  }
}
