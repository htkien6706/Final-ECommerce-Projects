import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'crypto';
import { Role } from '../authorization/enums/role.enum';
import { STATUS } from 'src/manage-users/enum/status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from 'src/manage-users/entity/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly dataSource : DataSource,
        private readonly jwtService : JwtService,
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
}
