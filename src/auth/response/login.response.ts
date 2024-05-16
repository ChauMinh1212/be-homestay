import { ApiProperty } from "@nestjs/swagger";
import { BaseResponse } from "../../util/response";

class LoginResponse {
    @ApiProperty({
        type: String
    })
    user_name: string

    @ApiProperty({
        type: String
    })
    email: string

    @ApiProperty({
        type: String
    })
    avatar: string

    @ApiProperty({
        type: String
    })
    access_token: string

    @ApiProperty({
        type: String
    })
    refresh_token: string
}

export class LoginResponseSwagger extends BaseResponse {
    @ApiProperty({
        type: LoginResponse
    })
    data: LoginResponse
}

