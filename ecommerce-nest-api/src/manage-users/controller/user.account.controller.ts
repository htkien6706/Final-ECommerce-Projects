import { Body, Controller, Put, UseGuards, Get, Req } from "@nestjs/common";
import { JWTAuthGuard } from "src/auth/authentication/guards/jwt.guard";
import { Roles } from "src/auth/authorization/decorators/role.decorator";
import { Role } from "src/auth/authorization/enums/role.enum";
import { RoleGuard } from "src/auth/authorization/guards/role.guard";
import { UserDto } from "../dto/user.dto";
import { UserAccountService } from "../provider/user.account.service";

@UseGuards(JWTAuthGuard, RoleGuard)
@Roles(Role.User)
@Controller('user/account')
export class UserAccountController {
    constructor(private readonly userAccountService : UserAccountService) {}
    @Get()
    async viewProfile(@Body() userDto : UserDto) {
        return this.userAccountService.findUserByUsername(userDto.username);
    }

    //now, user can change their password and change their username
    @Put()
    async changePassword(@Body() userDto : UserDto) {
        return this.userAccountService.changeUserPasswordUsingUsername(userDto.username, userDto.password);
    }

    @Put()
    async changeUsername(@Body() userDto : UserDto, @Req() req : any) {
        return this.userAccountService.changeUsername(userDto.username, req.user.username);
    }
}

//user can update their password and username, also view their information, includes all their details like roles, status, username, password ....
