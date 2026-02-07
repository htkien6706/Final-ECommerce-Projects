import { Module } from '@nestjs/common';
import { ProductModules } from './manage-products/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './manage-products/product.entity';
import { AuthModule } from './auth/authentication/auth.module';
import { UserEntity } from './manage-users/entity/user.entity';
import { AccountModule } from './manage-users/account.module';
import { AdminSeedModule } from './manage-users/seed-user/admin-seed.module';

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
      entities: [ProductEntity, UserEntity], // insert Products entity into entities array in forRoot module method options to let TypeORM know its existance
      synchronize: true,
    }),
    AuthModule,
    AccountModule,
    AdminSeedModule, //add this module here because when all modules are initialized, the bootstrap will run the seed data, then all backend are ready to receive request from frontend
  ],
})
export class AppModule {}
