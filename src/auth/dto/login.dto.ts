import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class LoginDto {
    @IsNotEmpty()
    @ApiProperty({
        type: String
    })
    email: string
    
    @IsNotEmpty()
    @ApiProperty({
        type: String
    })
    password: string
}