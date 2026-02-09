import { Injectable } from "@nestjs/common";
import { ProductEntity } from "../product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateProductDto } from "../dto/create-product.dto";

@Injectable()
export class AdminProductsService {
    constructor(
        private readonly dataSource: DataSource,
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ) { }

    async findAll(): Promise<ProductEntity[]> {
        return this.productRepository.find();
    }

    async create(productDto: CreateProductDto) {
        return this.productRepository.save(productDto);
    }

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

    async remove(id: string): Promise<{ message: string }> {
        const res = await this.productRepository.delete({ uniqueId: id });
        if (res.affected === 0) {
            throw new Error('Cannot found !');
        }

        return { message: 'Successful delete' };
    }
}