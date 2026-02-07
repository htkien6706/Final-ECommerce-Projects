import { SetMetadata } from "@nestjs/common";
import { Role } from "../enums/role.enum";

export const KEY_OF_ROLES = 'roles';

//create metedata decorator named Roles to attach more data into the controller
export const Roles = ((...roles : Role[]) => SetMetadata(KEY_OF_ROLES, roles));