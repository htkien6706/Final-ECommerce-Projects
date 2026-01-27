import { ProductService } from './product.service';
import {
  Get,
  Put,
  Delete,
  Post,
  Controller,
  Body,
  Param,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './product.entity';

@Controller('api/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get() // get all product->serve VIEW in CRUD
  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productService.findAll();
    console.log(products.length);
    return products;
  }

  @Post() // create new product, same with CREATE op in CRUD
  async create(@Body() dto: CreateProductDto): Promise<ProductEntity> {
    const addedProduct = await this.productService.create(dto);
    console.log(addedProduct);

    return addedProduct; // return just the addedProduct
  }

  @Put(':id') // update the product, same with UPDATE op in CRUD
  async update(@Body() dto: CreateProductDto): Promise<ProductEntity> {
    return this.productService.update(dto);
  }

  @Delete(':id') // delete the product according to its uniqueId, same with DELETE Operation in CRUD
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
