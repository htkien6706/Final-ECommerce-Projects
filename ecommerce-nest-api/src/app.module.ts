import { Module } from '@nestjs/common';
import { ProductModules } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './product/product.entity';

@Module({
  imports: [
    ProductModules,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Kien0607$',
      database: 'ecommerce_nest',
      entities: [ProductEntity], // insert Products entity into entities array in forRoot module method options to let TypeORM know its existance
      synchronize: true,
    }),
  ],
})
export class AppModule {}
