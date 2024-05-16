import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../util/base.entity";

@Entity('user')
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number

    @Column({
        type: 'varchar'
    })
    username: string

    @Column({
        type: 'varchar',
        default: ''
    })
    email: string

    @Column({
        type: 'varchar',
        default: ''
    })
    phone: string

    @Column({
        type: 'int',
        default: 0
    })
    point: string

    @Column({
        type: 'varchar'
    })
    password: string

    @Column({
        type: 'varchar',
        default: ''
    })
    avatar: string

    @Column({
        type: 'varchar',
        nullable: true
    })
    refresh_token: string

    @Column({
        type: 'int',
        default: 0 // 0 - User, 1 - Admin
    })
    role: number
}