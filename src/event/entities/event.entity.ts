import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../../util/base.entity";

@Entity('event')
export class EventEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number

    @Column({
        type: 'varchar',
        default: ''
    })
    title: string

    @Column({
        type: 'varchar',
        default: ''
    })
    content: string

    @Column({
        type: 'varchar',
        default: ''
    })
    img: string

    @Column({
        type: 'timestamptz',
        
    })
    from: string

    @Column({
        type: 'timestamptz',
        
    })
    to: string
}