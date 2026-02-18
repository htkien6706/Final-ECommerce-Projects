import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'crypto';
import { Role } from '../authorization/enums/role.enum';
import { STATUS } from 'src/manage-users/enum/status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from 'src/manage-users/entity/user.entity';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly dataSource : DataSource,
        private readonly jwtService : JwtService,

        @InjectRepository(UserEntity)
        private readonly userRepository : Repository<UserEntity>
    ) {}
    async validateUser({username, password}) {
        const findUser = await this.dataSource.createQueryBuilder(UserEntity, 'user').where("username = :username", {username : username}).getOne();

        console.log(findUser);

        if(!findUser) return null;
        if(findUser.password === password) {
            const {password, ...payload} = findUser;
            console.log(payload);
            return this.jwtService.signAsync(payload);
        }

        return null;
    }

    async createNewAccount(signupDto : SignupDto) : Promise<{message: string, done: boolean}> {
        const existingUsername = await this.userRepository.findOne({where: {username: signupDto.username}});

        const existingEmail = await this.userRepository.findOne({where: {email: signupDto.email}});

        if(existingUsername) {
            return {
                message:"Username existed! Please try another username",
                done:false,
            }
        }

        if(existingEmail) {
            return {
                message:"Same email found! Plase try using another email",
                done:false,
            }
        }
        

        const newUser = {
            ...signupDto,   
            roles:Role.User,
            account_status:STATUS.ACTIVE,
        }

        console.log("after successfully verify this username is unique, we will create new account which is: ", newUser);

        const queryResult = this.userRepository.save(newUser);
        return {
            message:"Sucessfully signup, login to use our services !",
            done:true,
        } 
    }

    
}
