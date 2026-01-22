import { ProductService } from './product.service';
import { Get, Put, Delete, Post, Controller, Body } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('api/product/')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get() // equivalent to READ method in CRUD
  findAll(): Product[] {
    return this.productService.findAll();
  }

  @Post() // equivalent to CREATE method in CRUD
  create(@Body() dto: CreateProductDto): Product[] {
    return this.productService.create(dto);
  }

  @Put() // equivalent to UPDATE method in CRUD
  update(@Body() dto: CreateProductDto): Product[] {
    return this.productService.update(dto, dto.uniqueId);
  }

  @Delete() // eqiuvalent to DELTE method in CRUD
  delete(@Body() dto: CreateProductDto): Product[] {
    return this.productService.remove(dto.uniqueId);
  }
}
