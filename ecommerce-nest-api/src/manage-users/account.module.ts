import { Module } from "@nestjs/common";
import { AdminAccountController } from "./controller/admin.account.controller";
import { AdminAccountService } from "./provider/admin.account.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { UserAccountController } from "./controller/user.account.controller";
import { UserAccountService } from "./provider/user.account.service";

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    controllers:[AdminAccountController, UserAccountController],
    providers:[AdminAccountService, UserAccountService],
})
export class AccountModule {}
