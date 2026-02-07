import { Injectable } from "@nestjs/common";
import { OnApplicationBootstrap } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entity/user.entity";
import { Role } from "src/auth/authorization/enums/role.enum";
import { STATUS } from "../enum/status.enum";

// we want every time we init the app, if we dont have admin before, admin will automatically initialized here
@Injectable()
export class AdminSeedService implements OnApplicationBootstrap {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository : Repository<UserEntity>
    ) {}
    async onApplicationBootstrap() {
        const countAdmin = await this.userRepository.count({
            where: {roles: Role.Admin},
        });

        if(countAdmin > 0) {
            console.log("At least one admin is still existing, no need to add this seed admin anymore !");
            return;
        }

        const username = 'admin';
        const password = 'admin123'

        //create new entity and save it to the database then
        const newAdmin = this.userRepository.create({
            username: username,
            password: password,
            roles: Role.Admin,
            account_status: STATUS.ACTIVE,
        })

        await this.userRepository.save(newAdmin);
        console.log("Seed admin has been completed ! Please add this to the module and export it, then import it in app module !");
    }
}