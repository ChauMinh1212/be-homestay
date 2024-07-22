import { DistrictEntity } from "src/district/entities/district.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../../util/base.entity";

@Entity('room')
export class RoomEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number

    @Column({
        type: 'varchar'
    })
    code: string

    @Column({
        type: 'varchar',
        default: ''
    })
    name: string

    @Column({
        type: 'varchar',
        default: ''
    })
    address: string

    @Column({
        type: 'varchar',
        default: ''
    })
    description: string

    @Column({
        type: 'int',
        default: 1
    })
    quantity: number

    @Column({
        type: 'int',
        default: 2
    })
    capacity: number //sức chứa

    @Column({
        type: 'int',
        default: 0 // 0 - Homestay, 1 - Apartment, 2 - Habour, 3 - Garden
    })
    type: number

    @Column({
        type: 'varchar',
        default: ''
    })
    img: string

    @Column({
        type: 'varchar',
        default: ''
    })
    price: string

    @Column({
        type: 'varchar',
        default: ''
    })
    color: string

    @ManyToOne(() => DistrictEntity, (district) => district.id)
    @JoinColumn({name: 'district_id'})
    district: DistrictEntity
}