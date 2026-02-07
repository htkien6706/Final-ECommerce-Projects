//admin can have CRUD with user account
import { Controller, Get, UseGuards, Post, Put, Delete, Body } from "@nestjs/common";
import { JWTAuthGuard } from "src/auth/authentication/guards/jwt.guard";
import { Role } from "src/auth/authorization/enums/role.enum";
import { RoleGuard } from "src/auth/authorization/guards/role.guard";
import { Roles } from "src/auth/authorization/decorators/role.decorator";
import { AdminAccountService } from "../provider/admin.account.service";
import { UserDto } from "../dto/user.dto";

@UseGuards(JWTAuthGuard, RoleGuard)
@Roles(Role.Admin)
@Controller('admin/account')
export class AdminAccountController {
    constructor(private readonly adminAccountService : AdminAccountService) {}
    
    @Get()
    async findAll() {
        return this.adminAccountService.findAll();
    }

    @Post()
    async createUser(@Body() userDto : UserDto) {
        return this.adminAccountService.createNewUser(userDto)
    }

    @Delete()
    async deleteUser(@Body() userDto : UserDto) {
        return this.adminAccountService.deleteThisUser(userDto.username);
    }

    

    

    

    
}