import { Module } from "@nestjs/common";
import { AdminSeedService } from "./admin-seed.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../entity/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers:[AdminSeedService],
})
export class AdminSeedModule{}