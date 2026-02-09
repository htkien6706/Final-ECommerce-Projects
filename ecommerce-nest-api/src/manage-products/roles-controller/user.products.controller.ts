import { Controller, UseGuards, Get } from "@nestjs/common";
import { ProductEntity } from "../product.entity";
import { UserProductsService } from "../roles-services/user.products.service";
import { JWTAuthGuard } from "src/auth/authentication/guards/jwt.guard";
import { RoleGuard } from "src/auth/authorization/guards/role.guard";
import { Roles } from "src/auth/authorization/decorators/role.decorator";
import { Role } from "src/auth/authorization/enums/role.enum";

@UseGuards(JWTAuthGuard, RoleGuard)
@Roles(Role.User)
@Controller('user/products')
export class UserProductsController {
    //user can only view the products 
    constructor(private readonly userProductsService : UserProductsService) {}
    @Get()
    async findAll() : Promise<ProductEntity[]> {
        return this.userProductsService.findAll();
    }

}