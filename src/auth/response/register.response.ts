import { ApiProperty } from "@nestjs/swagger"
import { BaseResponse } from "../../util/response"

class RegisterResponse {
    @ApiProperty({
        type: String
    })
    user_name: string

    @ApiProperty({
        type: String
    })
    email: string

    @ApiProperty({
        type: Number,
        description: '0 - Chưa xác thực email, 1 - Đã xác thực'
    })
    is_active: number

    @ApiProperty({
        type: String
    })
    access_token: string

    @ApiProperty({
        type: String
    })
    refresh_token: string
}

export class RegisterResponseSwagger extends BaseResponse {
    @ApiProperty({
        type: RegisterResponse
    })
    data: RegisterResponse
}