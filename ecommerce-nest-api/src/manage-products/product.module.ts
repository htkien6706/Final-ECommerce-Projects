import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { AuthorizationModule } from 'src/auth/authorization/authorization.module';
import { AdminProductsController } from './roles-controller/admin.products.controller';
import { AdminProductsService } from './roles-services/admin.products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), AuthorizationModule],
  controllers: [ProductController, AdminProductsController],
  providers: [ProductService, AdminProductsService],
})
export class ProductModules {}
