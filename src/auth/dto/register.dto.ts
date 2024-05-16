import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"

export class RegisterDto {
    @IsEmail()
    @ApiProperty({
        type: String
    })
    email: string

    @IsNotEmpty()
    @ApiProperty({
        type: String
    })
    username: string

    @ApiProperty({
        type: String
    })
    phone: string

    @IsNotEmpty()
    @ApiProperty({
        type: String
    })
    password: string
}