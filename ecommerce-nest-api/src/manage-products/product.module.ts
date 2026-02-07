import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { AuthorizationModule } from 'src/auth/authorization/authorization.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), AuthorizationModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModules {}
