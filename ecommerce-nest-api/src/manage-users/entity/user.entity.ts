import { Role } from "src/auth/authorization/enums/role.enum";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { STATUS } from "../enum/status.enum";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fullname: string;

    @Column({unique:true})
    email: string;

    @Column({unique:true})
    username:string;

    @Column()
    password:string;

    @Column({
        type:"enum",
        enum:Role,
        default:Role.User,
    })
    roles: Role;

    @Column({
        type:"enum",
        enum:STATUS,
        default: STATUS.ACTIVE,
    })
    account_status:STATUS;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}