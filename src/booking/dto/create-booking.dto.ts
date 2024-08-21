import { ApiProperty } from "@nestjs/swagger"

export class CreateBookingDto {
    @ApiProperty({
        type: Number,
        description: 'id room'
    })
    id: number

    @ApiProperty({
        type: String,
        description: 'format YYYY-MM-DD HH:mm'
    })
    from: string

    @ApiProperty({
        type: String,
        description: 'format YYYY-MM-DD HH:mm'
    })
    to: string

    @ApiProperty({
        type: Number,
    })
    quantity: number
}

export class CreateBookingAdminDto extends CreateBookingDto {
    @ApiProperty({
        type: Number
    })
    user_id: number
}
