import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { sign } from 'crypto';

const fakeUsers = [
    {
        username:"phanthiquynh",
        password:"hatinh",
    },

    {
        username:"vuthiphuonganh",
        password:"namdinh",
    }
]

@Injectable()
export class AuthService {
    constructor(private readonly jwtService : JwtService) {}
    async validateUser({username, password}) {
        const findUser = fakeUsers.find(user => user.username === username);
        if(!findUser) return null;
        if(findUser && findUser.password === password) {
            const {password, ...payload} = findUser;
            return this.jwtService.signAsync(payload);
        }
    }
}
