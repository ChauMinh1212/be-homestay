import { ApiProperty } from "@nestjs/swagger";

export class QueryEventDto {
    @ApiProperty({
        type: Number,
        description: `-1 - Tất cả, 0 - Không hoạt động, 1 - Hoạt động`
    })
    status: number
}
 