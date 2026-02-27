import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { UserDto } from "../dto/user.dto";
import { NotFoundException } from "@nestjs/common";
@Injectable()
export class AdminAccountService {
    constructor(
        private readonly dataSource : DataSource,
        @InjectRepository(UserEntity)
        private readonly userRepository : Repository<UserEntity>
    ) {

    }
    async findAll() : Promise<UserEntity[]> {
        const total_entities = this.userRepository.count();
        console.log(total_entities);
        return this.userRepository.find();
    }

    async createNewUser(userDto : UserDto) : Promise<UserEntity> {
        const newUser = this.userRepository.create(userDto); // create a new entity, later save it to the database
        console.log(newUser);

        return this.userRepository.save(newUser);
    }

    async deleteThisUser(deletedUsername: string) : Promise<{done: boolean, message: string}> {
        const queryResult = await this.dataSource.createQueryBuilder().delete().from(UserEntity).where("username = :username", {username : deletedUsername}).execute();
        console.log(queryResult);
        
        if (!queryResult.affected) {
            throw new NotFoundException(`User ${deletedUsername} not found`);
        }

        else {
            return {
                done: true,
                message:`Delete user with username ${deletedUsername} successfully`,
            }
        }
    }

    //admin should not modify username and password of user, just modify role and account_status
    async updateUser(userDto : UserDto) : Promise<{message: string, done:boolean}> {
        const queryResult = this.dataSource.createQueryBuilder().update(UserEntity).set({
            roles: userDto.roles,
            account_status: userDto.account_status
        })
        .where("username = :username", {username : userDto.username})
        .execute();

        console.log(queryResult);
        
        if(!(await queryResult).affected) {
            throw new NotFoundException(`User ${userDto} is not available to update`);
        }

        else {
            return {
                message:"Updated successfully!",
                done: true,
            }
        }
    }
}