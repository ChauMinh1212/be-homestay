import { RoomEntity } from "src/room/entities/room.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../../util/base.entity";

@Entity('booking')
export class BookingEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number

    @ManyToOne(() => RoomEntity, (room) => room.id)
    @JoinColumn({name: 'room_id'})
    room: RoomEntity

    @ManyToOne(() => UserEntity, (user) => user.id)
    @JoinColumn({name: 'user_id'})
    user: UserEntity

    @Column({
        type: 'timestamptz',
        
    })
    from: string

    @Column({
        type: 'timestamptz',
        
    })
    to: string
    
    @Column({
        type: 'varchar',
        default: 1
    })
    quantity: number
}