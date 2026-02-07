import { Controller, UseGuards } from "@nestjs/common";
import { JWTAuthGuard } from "src/auth/authentication/guards/jwt.guard";
import { Roles } from "src/auth/authorization/decorators/role.decorator";
import { Role } from "src/auth/authorization/enums/role.enum";
import { RoleGuard } from "src/auth/authorization/guards/role.guard";

@UseGuards(JWTAuthGuard, RoleGuard)
@Roles(Role.User)
@Controller()
export class UserAccountController {
    
}