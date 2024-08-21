import { ApiProperty } from "@nestjs/swagger";

export class CreateBannerDto {
    @ApiProperty({
        type: String,
        isArray: true
    })
    banner: string[]
}
