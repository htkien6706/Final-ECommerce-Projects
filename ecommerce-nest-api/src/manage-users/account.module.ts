import { Module } from "@nestjs/common";
import { AdminAccountController } from "./controller/admin.account.controller";
import { AdminAccountService } from "./provider/admin.account.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    controllers:[AdminAccountController],
    providers:[AdminAccountService],
})
export class AccountModule {}
