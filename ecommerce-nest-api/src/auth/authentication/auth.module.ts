import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategies';
import { PassportModule } from '@nestjs/passport';
import { LocalGuard } from './guards/local.guard';
import { JWTAuthGuard } from './guards/jwt.guard';
import { JWTStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/manage-users/entity/user.entity';

@Module({
  imports: [JwtModule.register({
    secret:"abc", 
    signOptions:{expiresIn:'1h'},
  }),PassportModule, 
TypeOrmModule.forFeature([UserEntity])],
  
  controllers:[AuthController],
  providers:[AuthService, LocalStrategy, LocalGuard, JWTAuthGuard, JWTStrategy],
  exports:[JWTAuthGuard],
})
export class AuthModule {}
