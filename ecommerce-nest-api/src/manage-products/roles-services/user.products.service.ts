import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "../product.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository : Repository<ProductEntity>
    ) {}
    async findAll() {
        const entities = await this.productRepository.find();
        console.log(entities.length);
        return entities;
    }
}