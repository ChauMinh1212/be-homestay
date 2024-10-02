import { ApiProperty } from "@nestjs/swagger";

export class CreateComboDto {
    @ApiProperty({
        type: String,
        example: 'COMBO 1'
    })
    name: string

    @ApiProperty({
        type: String,
        example: `['18:00', '12:00']`
    })
    time: string

    @ApiProperty({
        type: Number,
        example: 750000
    })
    price: number

    @ApiProperty({
        type: Number,
        example: 1
    })
    inday: number
}
