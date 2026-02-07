import { Role } from "src/auth/authorization/enums/role.enum";
import { STATUS } from "../enum/status.enum";

export class UserDto {
    username: string;
    password:string;
    roles: Role;
    account_status: STATUS;
}