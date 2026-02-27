//admin can have CRUD with user account
//admin can view all users(GET), can create new user(POST and it can be admin or user), can deleteUser(DELETE), can update user status(PUT)
import { Controller, Get, UseGuards, Post, Put, Delete, Body } from "@nestjs/common";
import { JWTAuthGuard } from "src/auth/authentication/guards/jwt.guard";
import { Role } from "src/auth/authorization/enums/role.enum";
import { RoleGuard } from "src/auth/authorization/guards/role.guard";
import { Roles } from "src/auth/authorization/decorators/role.decorator";
import { AdminAccountService } from "../provider/admin.account.service";
import { UserDto } from "../dto/user.dto";

@UseGuards(JWTAuthGuard, RoleGuard)
@Roles(Role.Admin)
@Controller('admin/account-management')
export class AdminAccountController {
    constructor(private readonly adminAccountService : AdminAccountService) {}
    
    @Get('get-users')
    async findAll() {
        return this.adminAccountService.findAll();
    }

    @Post('create-user')
    async createUser(@Body() userDto : UserDto) {
        return this.adminAccountService.createNewUser(userDto)
    }

    @Delete('delete-user')
    async deleteUser(@Body() userDto : UserDto) {
        return this.adminAccountService.deleteThisUser(userDto.username);
    }

    @Put('update-user') // synonymous with UPDATE operation
    async updateUser(@Body() userDto : UserDto) {
        return this.adminAccountService.updateUser(userDto);
    }    
}