import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../util/base.entity";

@Entity('combo')
export class ComboEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number

    @Column({
        type: 'varchar',
        default: ''
    })
    name: string

    @Column({
        type: 'varchar',
        default: '[]'
    })
    time: string

    @Column({
        type: 'int',
        default: 0
    })
    price: number

    @Column({
        type: 'int',
        default: 0
    })
    inday: number
}