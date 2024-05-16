import * as moment from "moment";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class BaseEntity {
    @Column({
        type: 'timestamp',
        default: moment().toDate()
    })
    created_at: Date

    @Column({
        type: 'timestamp',
        default: moment().toDate()
    })
    updated_at: Date

    @BeforeUpdate()
    public setUpdateDate(): void {
        console.log('update');
        
        this.updated_at = moment().toDate();
    }

    @BeforeInsert()
    public setCreateDate(): void {
        this.created_at = this.updated_at = moment().toDate();
    }
}