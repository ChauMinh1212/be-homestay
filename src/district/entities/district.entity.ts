import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../util/base.entity";

@Entity('district')
export class DistrictEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number

    @Column({
        type: 'varchar',
        default: ''
    })
    name: string
}