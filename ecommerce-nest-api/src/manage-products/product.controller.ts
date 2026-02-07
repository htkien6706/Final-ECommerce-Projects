import { ProductService } from './product.service';
import {
  Get,
  Put,
  Delete,
  Post,
  Controller,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './product.entity';
import { RoleGuard } from 'src/auth/authorization/guards/role.guard';
import { Role } from 'src/auth/authorization/enums/role.enum';
import { Roles } from 'src/auth/authorization/decorators/role.decorator';
import { JWTAuthGuard } from 'src/auth/authentication/guards/jwt.guard';
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

  @Delete(':id') // delete the product according to its uniqueId, same with DELETE Operation in CRUD
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Put() // update the product, same with UPDATE op in CRUD
  async update(@Body() dto: CreateProductDto) {
    return this.productService.updateById(dto);
  }

  @Get('seedData')
  async seedData(): Promise<ProductEntity[]> {
    return this.productService.getSeedData();
  }

  @UseGuards(JWTAuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Get('test')
  async findUsers() {
    return this.productService.getUser();
  }
}
