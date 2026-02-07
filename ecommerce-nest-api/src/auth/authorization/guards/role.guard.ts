import { Role } from "../enums/role.enum";
import { KEY_OF_ROLES, Roles } from "../decorators/role.decorator";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { CanActivate } from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";

@Injectable()
//check if user can access the protected route or not
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector : Reflector) {};

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        //need to get the metedata, which means roles from the method/class controller, compare with the request from user
        const requiredRoles = this.reflector.getAllAndOverride<Role[]> (KEY_OF_ROLES, 
            [
                context.getHandler(),
                context.getClass(),
            ]
        );
        console.log(requiredRoles);
        if(!requiredRoles) {
            return false;
        }

        //get the request from which user send to server
        console.log(context.getType());
        const { body } = context.switchToHttp().getRequest();
        console.log(body);
        const { user } = context.switchToHttp().getRequest();
        console.log(user);
        
        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}