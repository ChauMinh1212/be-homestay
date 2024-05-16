import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class VerifyAccountDto {
    @IsNotEmpty()
    @ApiProperty({
        type: Number
    })
    code: number
}