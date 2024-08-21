import { ApiProperty } from "@nestjs/swagger";

export class CreateEventDto {
    @ApiProperty({
        type: String
    })
    title: string

    @ApiProperty({
        type: String
    })
    content: string

    @ApiProperty({
        type: String
    })
    img: string

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
}
