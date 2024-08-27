import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class IdDto {
    @IsNotEmpty({message: 'id not found'})
    @ApiProperty({
        type: Number
    })
    id: number
}