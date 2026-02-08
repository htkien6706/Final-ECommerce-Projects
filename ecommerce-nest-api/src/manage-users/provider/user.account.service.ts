import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserAccountService {
    constructor(
        private readonly dataSource : DataSource,
        @InjectRepository(UserEntity)
        private readonly userRepository : Repository<UserEntity>
        
    ){}
    async findUserByUsername(username : string) {
        const findUser = await this.dataSource.createQueryBuilder(UserEntity, "user").where("user.username = :username", {username : username}).getOne();

        return findUser;
    }

    async changeUserPasswordUsingUsername(username: string, password : string) {
        const updateQuery = await this.dataSource.createQueryBuilder().update(UserEntity).set({
            password: password,
        }).where("UserEntity.username = :username", {username : username}).execute();

        console.log("Update password succesfully !");

        return updateQuery;
    }

    async changeUsername(newUsername : string, currentUsername : string) {
        const currentEntity =  await this.userRepository.findOne({
            where:{
                username: currentUsername
            }
        })

        if(!currentEntity !) {
            throw new NotFoundException('User is not found!');
        }

        return this.userRepository.save(currentEntity);   
    }
}