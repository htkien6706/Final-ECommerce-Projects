import { Body, Controller, Get, UseGuards, Post, Put, Delete, Param } from "@nestjs/common";
import { ProductEntity } from "../product.entity";
import { AdminProductsService } from "../roles-services/admin.products.service";
import { JWTAuthGuard } from "src/auth/authentication/guards/jwt.guard";
import { RoleGuard } from "src/auth/authorization/guards/role.guard";
import { Roles } from "src/auth/authorization/decorators/role.decorator";
import { Role } from "src/auth/authorization/enums/role.enum";
import { CreateProductDto } from "../dto/create-product.dto";

@UseGuards(JWTAuthGuard, RoleGuard)
@Roles(Role.Admin)
@Controller('admin/product')
export class AdminProductsController {
    constructor(private readonly adminProductsService : AdminProductsService) {}
    //get all the products in the database
    @Get()
    findAll() : Promise<ProductEntity[]> {
        return this.adminProductsService.findAll();
    }

    @Post()
    async create(@Body() productDto : CreateProductDto) {
        return this.adminProductsService.create(productDto);
    }

    @Put() // update the product, same with UPDATE op in CRUD
    async update(@Body() dto: CreateProductDto) {
        return this.adminProductsService.updateById(dto);
    }

    @Delete(':id') // delete the product according to its uniqueId, same with DELETE Operation in CRUD
    async remove(@Param('id') id: string) {
        return this.adminProductsService.remove(id);
    }
    
}