import { Injectable } from "@nestjs/common";
import { UserEntity } from "../entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { UserDto } from "../dto/user.dto";
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

    async createNewUser(userDto : UserDto) {
        const newUser = this.userRepository.create(userDto); // create a new entity, later save it to the database
        console.log(newUser);

        return this.userRepository.save(newUser);
    }

    async deleteThisUser(deletedUsername: string) {
        const queryResult = await this.dataSource.createQueryBuilder().delete().from(UserEntity).where("username = :username", {username : deletedUsername});
        console.log(queryResult);
    }
}