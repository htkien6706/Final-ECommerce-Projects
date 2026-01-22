import { Module } from '@nestjs/common';
import { ProductModules } from './product/product.module';

@Module({
  imports: [ProductModules],
})
export class AppModule {}
